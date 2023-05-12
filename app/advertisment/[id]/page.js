import Image from "next/image"
import { getDetail } from "@/lib/advertisment";

export default async function Detail({searchParams, params}) {
  const {page = '1'} = searchParams
  const detail = await getDetail(parseInt(params.id))

  return (
    <div className="text-sm">
      <div class="flex justify-between">
        <h1 className="text-lg font-bold mb-4 text-lime-400">{detail.title}</h1>
        <a href={`/advertisment/?page=${page}`}>
          <div className={"px-3 py-2 text-neutral-500 bg-white font-medium rounded-md border-2 border-lime-400"}>
            <i className="fa fa-arrow-left-long mr-2" />
            Retour
          </div>
        </a>
      </div>
      <h2 className={"text-medium font-bold mb-2 text-lime-400"}>Informations</h2>
      <ul>
        <li>Prix : {detail.price}</li>
        {detail.rent && <li>Loyer : {detail.rent}</li>}
        {detail.surface && <li>Surface : {detail.surface} m2</li>}
        <li>Référence : {detail.reference}</li>
      </ul>
      <h2 className={"font-bold mt-2 mb-2 text-lime-400"}>Description</h2>
      <div dangerouslySetInnerHTML={{__html: detail.content}}/>
      <h2 className={"font-bold mt-2 mb-2 text-lime-400"}>Localisation</h2>
      <ul className="mb-4">
        <li>Ville : {detail.city}</li>
        <li>Code postal : {detail.postalCode}</li>
        <li>Département : {detail.department}</li>
      </ul>
      {
        Boolean(detail.pictures.length) && detail.pictures.map(({id, url}) => (
          <div key={id} className="mt-2"><Image src={url} width={400} height={400}/></div>
        ))
      }
    </div>
  )
}
