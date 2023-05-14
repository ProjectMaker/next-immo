'use client'
import Image from "next/image"
import { Carousel } from "react-responsive-carousel"
import styles from "react-responsive-carousel/lib/styles/carousel.css";

function Item({img, label, description}) {
  return (
    <div className={"md:w-[896px]"}>
      <Image src={img} width={720} height={500} alt={label}/>
      <div className="legend">
        <div dangerouslySetInnerHTML={{__html: label}} />
        <div dangerouslySetInnerHTML={{__html: description}} />
      </div>
    </div>
  )
}

export default function ImmoCarousel({items}) {
  return (
    <Carousel showArrows={true}>
      {
        items.map(item => <Item key={item.label} {...item} />)
      }
    </Carousel>
  )
}
