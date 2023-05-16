import dayjs from "dayjs";
import Image from "next/image";
import classNames from "classnames";
import getList, { pagination, getDistinctCodeTypes, getCategory } from "@/lib/advertisment";
import { ListboxAdvType, ListboxAdvCategory } from "@/components/client/Listbox";

export const metadata = {
  title: 'Acheter / Louer | L\' agence immobilière',
  description: '',
}

async function Header({page, type, category}) {
  const categories = await getDistinctCodeTypes({type})
  const paginate = await pagination({page, type, category})
  const nextPage = paginate.page < paginate.nbPages ? paginate.page + 1 : null
  const prevPage = paginate.page > 1  ? paginate.page - 1 : null

  return (
    <>
      <div className="flex justify-between items-center">
        <div>{paginate.nbItems} annonce(s)</div>
        <div className={"hidden md:flex"}>
          <div className="mr-4">
            <ListboxAdvType type={type} category={category}/>
          </div>
          <ListboxAdvCategory type={type} category={category} categories={categories}/>
        </div>
        <div className="flex ">
          {prevPage && (
            <div className="mr-4">
              <a href={`/advertisment/?page=${prevPage}&type=${type}&category=${category}`}>
                <div className="rounded-2xl border-2 bg-white text-neutral-500 border-lime-400" ><i className="fa fa-arrow-left-long mr-2 ml-2" /></div>
              </a>
            </div>
          )}
          <div>{paginate.page} / {paginate.nbPages}</div>
          {nextPage && (
            <div className="ml-4">
              <a href={`/advertisment/?page=${nextPage}&type=${type}&category=${category}`}>
                <div className="rounded-2xl border-2 bg-white text-neutral-500 border-lime-400" ><i className="fa fa-arrow-right-long ml-2 mr-2" /></div>
              </a>
            </div>
          )}
        </div>
      </div>
      <div className={"block md:hidden"}>
        <ListboxAdvType type={type} category={category} />
      </div>
    </>
  )
}
async function Content({page, type, category}) {
  const list = await getList({page, type, category})
  const paginate = await pagination({page, type, category})

  if (!list.length) {
    return (
      <div className={"md:w-[896px]"}> <h1>Aucune annonce ne correspond à votre recherche</h1></div>
    )
  }
  return list.map(item => {
    return (
      <div className={"flex flex-col mb-4 text-sm"} key={item.id}>
        <div className={"text-white"}>
          <div className={"flex flex-row justify-between"}>
            <span className="font-bold text-lime-400" dangerouslySetInnerHTML={{__html: item.title}} />
            <span>{item.publishedAt ? dayjs(item.publishedAt).format("DD/MM/YYYY") : null}</span>
          </div>
          <div className={"flex flex-row justify-between"}>
            {
              Boolean(item.price) && (
                <div><span className="text-lime-400">Prix : </span><span>{item.price}</span></div>
              )
            }
            <div><span className="text-lime-400">Catégorie : </span><span>{getCategory(item.codeType)?.label}</span></div>
          </div>
        </div>
        <div className={"flex flex-col mt-4 mb-2 md:flex-row"}>
          {
            Boolean(item.pictures.length) && (
              <Image width={200} height={100} src={item.pictures[0].url} alt={item.title}/>
            )
          }
          <div className={classNames("mt-2 ml-0 md:mt-0", item.pictures.length ? "md:ml-4" : "")} dangerouslySetInnerHTML={{__html: item.content}} />
        </div>
        <a href={`/advertisment/${item.id}/?page=${paginate.page}&type=${type}&category=${category}`}>
          <div className={"self-end px-3 py-2 text-neutral-500 bg-white font-medium rounded-md border-2 border-lime-400"}>
            Voir le détail
          </div>
        </a>
      </div>
    )
  })
}
export default async function Home({ searchParams }) {
  const {page = '1', type = 'ALL', category = 'ALL'} = searchParams
  return (

    <div>
      <Header type={type}  page={page} category={category} />
      <div className="mt-8">
        <Content type={type}  page={page} category={category} />
      </div>
    </div>
  )
}
