import Image from 'next/image'
import { Carousel } from "react-responsive-carousel"
import styles from "react-responsive-carousel/lib/styles/carousel.css";

export default function Carousel2({children}) {
  return (
      <Carousel showArrows={true} >
        {children}
      </Carousel>
  );
}
