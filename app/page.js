import Image from "next/image"

import ImmoCarousel from "@/components/client/Carousel";
import { CAROUSEL_ITEMS } from "@/lib/dictionary";

export const metadata = {
  title: 'Accueil | L\' agence immobilière',
  description: 'Vente, location, cession de bail, fond de commerce',
}

function Item({img, label, description}) {
  return (
    <div className="flex flex-col mb-4">
      <h1 className="font-bold text-lime-400 my-2" dangerouslySetInnerHTML={{__html: label}} />
      <Image
        src={img}
        width={660}
        height={470}
        alt={label}
      />
      <p className={"mt-2"} dangerouslySetInnerHTML={{__html: description}} />
    </div>
  )
}

export default function Home() {
  return (
    <div className="text-sm">
      <div className={"hidden md:block"}>
        <ImmoCarousel items={CAROUSEL_ITEMS} />
      </div>
      <div  className="flex flex-col md:hidden">
        {
          CAROUSEL_ITEMS.map(item => <Item key={item.label} {...item} />)
        }
      </div>
    </div>
  )
}
