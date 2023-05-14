import { db } from "./db"
import codeTypes from "./code-type"

const NB_ITEMS_BY_PAGE = 10

export const TYPES = [
  {value: 'V', label: 'Vente'},
  {value: 'B', label: 'Cession de bail'},
  {value: 'F', label: 'Fond de commerce'},
  {value: 'L', label: 'Location'},
  {value: 'S', label: 'Location saisonnière'}
]


export function getCategory(code) {
  return codeTypes.find(codeType => codeType.code === code ? ({value: code, label: codeType.label}) : null)
}

export async function getDistinctCodeTypes({type = 'ALL'}) {
  const codes = await db.realEstateAd.findMany({
    distinct: ['codeType'],
    select: {
      codeType: true
    },
    ...(type === 'ALL' ? {} : {where: {type}})
  })
  console.log('type', type)
  return codes.map(({codeType}) => ({value: codeType, label: codeTypes.find(({code}) => code === codeType)?.label}))
}

export async function pagination({page = '1', type = 'ALL', category = 'ALL'}) {
  let where = type === 'ALL' ? {} : {type}
  where = {...where, ...(category === 'ALL' ? {} : {codeType: category})}
  const nbItems = await db.realEstateAd.count((Object.keys(where).length ? {where} : {}))
  return {
    nbItems,
    nbPages: Math.ceil(nbItems / NB_ITEMS_BY_PAGE),
    page: parseInt(page)
  }
}
export default function getList({page = 1, type = 'ALL', category = 'ALL'}) {
  let where = type === 'ALL' ? {} : {type}
  where = {...where, ...(category === 'ALL' ? {} : {codeType: category})}
  return db.realEstateAd.findMany({
    select: { id: true, codeType: true, reference: true, title: true, price: true, content: true, publishedAt: true, pictures: true, type: true },
    orderBy: {
      publishedAt: 'desc'
    },
    ...(Object.keys(where).length ? {where} : {}),
    skip: (page - 1) * NB_ITEMS_BY_PAGE,
    take: NB_ITEMS_BY_PAGE
  });
}

export function getDetail(id) {
  return db.realEstateAd.findUnique({
    select: {
      id: true,
      reference: true,
      title: true,
      price: true,
      postalCode: true,
      city: true,
      department: true,
      content: true,
      rent: true,
      surface: true,
      publishedAt: true,
      pictures: true
    },
    where: {id}
  });
}
