const { xml2json } = require('xml-js')
const { PrismaClient } = require('@prisma/client')
const moment = require('moment')
const jsftp = require("jsftp");

const prisma = new PrismaClient()

const xml2JSON = (fields, jsonContent) => {
  const externalId = jsonContent.attributes.id
  let payload = {
    externalId,
    reference: fields.find(field => field.name === "reference")?.value,
    codeType: fields.find(field => field.name === "code_type")?.value,
    labelType: fields.find(field => field.name === "libelle_type")?.value,
    postalCode: fields.find(field => field.name === "code_postal")?.value,
    city: fields.find(field => field.name === "ville")?.value,
    department: fields.find(field => field.name === "departement")?.value,
    title: fields.find(field => field.name === "titre_fr")?.value,
    content: fields.find(field => field.name === "texte_fr")?.value,
    price: fields.find(field => field.name === "prix")?.value,
    rent: fields.find(field => field.name === "loyer")?.value,
    type: fields.find(field => field.name === "type")?.value,
    surface: fields.find(field => ["surface_commerciale", "surface_activite"].includes(field.name))?.value,
    dpeVierge: fields.find(field => field.name === "dpe_vierge")?.value === "true",
    dpeSoumis: fields.find(field => field.name === "soumis_dpe")?.value === "true",
    publishedAt: fields.find(field => field.name === "date_saisie")?.value
  }
  payload["price"] = payload["price"] && !isNaN(payload["price"]) ? parseInt(payload["price"]) : 0
  payload["rent"] = payload["rent"] && !isNaN(payload["rent"]) ? parseInt(payload["rent"]) : 0
  payload["surface"] = payload["surface"] && !isNaN(payload["surface"]) ? parseInt(payload["surface"]) : 0
  payload["publishedAt"] = moment(payload["publishedAt"], "DD/MM/YYYY").format()
  return payload
}

const formatFields = (jsonContent) => {
  let fields = jsonContent.elements
    .filter(({name}) => ["reference", "titre_fr", "texte_fr", "date_saisie"].includes(name) )
    .map(({name, elements}) => ({name, value: elements[0].text}))
  fields = jsonContent.elements.find(({name}) => name === "bien").elements
    .filter(({name}) => ["code_type", "libelle_type", "code_postal", "ville", "departement"].includes(name) )
    .map(({name, elements}) => ({name, value: elements[0].text})).concat(fields)
  fields = jsonContent.elements.find(({name}) => name === "bien").elements
    .find(({name}) => name === "diagnostiques").elements
    .map(({name, elements}) => ({name, value: elements[0].text })).concat(fields)
  fields = jsonContent.elements.find(({name}) => name === "prestation").elements
    .filter(({name}) => ["prix", "loyer", "type"].includes(name) )
    .map(({name, elements}) => ({name, value: elements[0].text})).concat(fields)
  fields = (jsonContent.elements.find(({name}) => name === "commerces")?.elements || [])
    .map(({name, elements}) => ({name, value: elements[0].text })).concat(fields)
  fields = (jsonContent.elements.find(({name}) => name === "photos")?.elements || [])
    .map(({name, elements}) => ({name, value: elements[0].text })).concat(fields)

  return fields
}
const addAdToDb = async (fields, payload) => {
  const {id} = await prisma.realEstateAd.create({data: payload})
  const promises = fields.filter(({name}) => name === "photo").map(({value}) => {
    return prisma.realEstateAdPicture.create({data: {
        realEstateAdId: id,
        url: value
      }})
  })
  await Promise.all(promises)
}

const removeToDb = async (ads) => {
  console.log('Remove ads')
  const refs = ads.map(ad => ad.json.reference)
  const adsInDb = await prisma.realEstateAd.findMany()
  const idsToRemove = adsInDb.filter(({reference}) => !refs.includes(reference)).map(({id}) => id)
  console.log(`Remove ${idsToRemove.length}`)
  await prisma.realEstateAdPicture.deleteMany({
    where: {
      realEstateAdId: {in: idsToRemove}
  }})
  await prisma.realEstateAd.deleteMany({
    where: {
      id: {in: idsToRemove}
    }})
  console.log(`Ads removed`)
}
const addToDb = async (ads) => {
  console.log(`Add ${ads.length} ad(s)`)
  let ad = ads.pop()
  while (ad) {
    const {fields, json} = ad
    await addAdToDb(fields, json)
    ad = ads.pop()
  }
  console.log('Ads added')
}
const updateToDb = async (ads) => {
  console.log(`Update ${ads.length} ad(s)`)
  let ad = ads.pop()
  while (ad) {
    const {id, json} = ad
    await prisma.realEstateAd.update({data: json, where: { id }})
    ad = ads.pop()
  }
  console.log(`Ads updated`)
}
const filterNewAds = async (ads) => {
  const promises = ads.map(ad => prisma.realEstateAd.findMany({
    where: {
      reference: ad.json.reference,
    },
  }))
  const results = await Promise.all(promises)
  return results.map((result, idx) => !result.length ? ads[idx] : null).filter(result => Boolean(result))
}

const filterOldAds = async (ads) => {
  const promises = ads.map(ad => prisma.realEstateAd.findMany({
    where: {
      reference: ad.json.reference,
    },
  }))
  const results = await Promise.all(promises)
  return results.map((result, idx) => result.length ? {id: result[0].id, ...ads[idx]} : null).filter(result => Boolean(result))
}


const file2JSON = async (data) => {
  console.log('Parse file')
  const elements = JSON.parse(xml2json(data))["elements"][0]["elements"]
  const json = elements
    .filter(({name}) => name === "annonce")
    .map(ad => {
      const fields = formatFields(ad)
      const json = xml2JSON(fields, ad)
      return {fields, json}
    })
  console.log('File parsed')
  return  json
}

const downloadFile = async () => {
  const {FTP_HOST, FTP_USER, FTP_PASSWORD} = process.env
  const ftp = new jsftp({
    host: FTP_HOST,
    user: FTP_USER,
    pass: FTP_PASSWORD
  });
  console.log('Download file from ftp')
  const ftpGet = async () => {
    return new Promise((resolve, reject) => {
      let str = ""
      ftp.get("./ag770050.xml", (err, socket) => {
        if (err) {
          reject(err)
        }
        socket.on("data", d => {
          str += d.toString();
        })

        socket.on("close", err => {
          if (!err) {
            resolve(str)
          } else {
            reject(err)
          }
        })
        socket.resume()
      })
    })
  }
  const ftpQuit = async () => {
    return new Promise((resolve, reject) => {
      ftp.raw("quit", (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      });
    })
  }
  const content = await ftpGet()
  await ftpQuit()
  console.log('File downloaded')
  return content
}

const run = async () => {
  const file = await downloadFile()
  const json = await file2JSON(file)
  const adsToUpdate = await filterOldAds(json)
  await updateToDb(adsToUpdate)
  const adsToAdd = await filterNewAds(json)
  await addToDb(adsToAdd)
  await removeToDb(json)
  return true
}

export default run
