import { db } from "./db"
const NB_ITEMS_BY_PAGE = 10

export const TYPES = [
  {value: 'V', label: 'Vente'},
  {value: 'B', label: 'Cession de bail'},
  {value: 'F', label: 'Fond de commerce'},
  {value: 'L', label: 'Location'},
  {value: 'S', label: 'Location saisonnière'}
]

export async function pagination({page = '1', type = 'ALL'}) {
  const nbItems = type === 'ALL'
    ? await db.realEstateAd.count()
    : await db.realEstateAd.count({where: {type}})
  return {
    nbItems,
    nbPages: Math.ceil(nbItems / NB_ITEMS_BY_PAGE),
    page: parseInt(page)
  }
}
export default function getList({page = 1, type = 'ALL'}) {
  return db.realEstateAd.findMany({
    select: { id: true, reference: true, title: true, price: true, content: true, publishedAt: true, pictures: true, type: true },
    orderBy: {
      publishedAt: 'desc'
    },
    ...(type === 'ALL' ? {} : {where: {type}}),
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
