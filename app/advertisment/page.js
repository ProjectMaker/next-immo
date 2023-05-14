import dayjs from "dayjs";
import Image from "next/image";
import classNames from "classnames";
import getList, { pagination, TYPES } from "@/lib/advertisment";
import { ListboxAdv } from "@/components/client/Listbox";

export const metadata = {
  title: 'Acheter / Louer',
  description: '',
}

export default async function Home({ searchParams }) {
  const {page = '1', type = 'ALL'} = searchParams
  const list = await getList({page, type})

  const paginate = await pagination({page, type})
  const nextPage = paginate.page < paginate.nbPages ? paginate.page + 1 : null
  const prevPage = paginate.page > 1  ? paginate.page - 1 : null
  return (
    <div>
      <div className="flex justify-between">
        <div>{paginate.nbItems} annonce(s)</div>
        <div className={"hidden md:block"}>
          <ListboxAdv
            items={type ? [{label: "Tous les types de biens", value: "ALL"}, ...TYPES] : TYPES}
            defaultSelected={TYPES.find(({value}) => value === type)}
            placeholder={"Tous les types de bien"}
          />
        </div>
        <div className="flex ">
            {prevPage && (
              <div className="mr-4">
                <a href={`/advertisment/?page=${prevPage}&type=${type}`}>
                  <div className="rounded-2xl border-2 bg-white text-neutral-500 border-lime-400" ><i className="fa fa-arrow-left-long mr-2 ml-2" /></div>
                </a>
              </div>
            )}
            <div>{paginate.page} / {paginate.nbPages}</div>
            {nextPage && (
              <div className="ml-4">
                <a href={`/advertisment/?page=${nextPage}&type=${type}`}>
                  <div className="rounded-2xl border-2 bg-white text-neutral-500 border-lime-400" ><i className="fa fa-arrow-right-long ml-2 mr-2" /></div>
                </a>
              </div>
            )}
          </div>
      </div>
      <div className={"block md:hidden"}>
        <ListboxAdv
          items={type ? [{label: "Tous les types de biens", value: "ALL"}, ...TYPES] : TYPES}
          defaultSelected={TYPES.find(({value}) => value === type)}
          placeholder={"Tous les types de bien"}
        />
      </div>
      <div className="mt-8">
        {
          Boolean(!list.length) && (
            <div className={"md:w-[896px]"}> <h1>Aucune annonce ne correspond à votre recherche</h1></div>
          )
        }
        {
          list.map(item => {
            return (
              <div className={"flex flex-col mb-4 text-sm"} key={item.id}>
                <div className={"text-white"}>
                  <div className={"flex flex-row justify-between"}>
                    <span className="font-bold text-lime-400" dangerouslySetInnerHTML={{__html: item.title}} />
                    <span>{item.publishedAt ? dayjs(item.publishedAt).format("DD/MM/YYYY") : null}</span>
                  </div>
                  {Boolean(item.price) && <div>Prix : {item.price}</div>}
                </div>
                <div className={"flex flex-col mt-4 mb-2 md:flex-row"}>
                  {
                    Boolean(item.pictures.length) && (
                       <Image width={200} height={100} src={item.pictures[0].url} alt={item.title}/>
                    )
                  }
                  <div className={classNames("mt-2 ml-0 md:mt-0", item.pictures.length ? "md:ml-4" : "")} dangerouslySetInnerHTML={{__html: item.content}} />
                </div>
                <a href={`/advertisment/${item.id}/?page=${paginate.page}&type=${type}`}>
                  <div className={"self-end px-3 py-2 text-neutral-500 bg-white font-medium rounded-md border-2 border-lime-400"}>
                    Voir le détail
                  </div>
                </a>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
