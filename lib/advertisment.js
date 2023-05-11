import { db } from "./db"
const NB_ITEMS_BY_PAGE = 10

export async function pagination({page = '1'}) {
  const nbItems = await db.realEstateAd.count()
  return {
    nbItems,
    nbPages: Math.ceil(nbItems / NB_ITEMS_BY_PAGE),
    page: parseInt(page)
  }
}
export default function getList({page = 1}) {
  return db.realEstateAd.findMany({
    select: { id: true, reference: true, title: true, price: true, content: true, publishedAt: true, pictures: true },
    orderBy: {
      publishedAt: 'desc'
    },
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
