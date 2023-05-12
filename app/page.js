'use client'
import {Carousel} from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.css"

function CarouselItem({img, label, description}) {
  return (
    <div>
      <img
        src={img}
        alt="Aventure immobilière Logo"
      />
      <p className="legend">
        {label}<br/>{description}
      </p>
    </div>
  )
}

function MobileItem({img, label, description}) {
  return (
    <div className="flex flex-col mb-4">
      <img
        src={img}
        alt="Aventure immobilière Logo"
      />
      <h1 className="text-lime-400 mt-2">{label}</h1>
      <p className={"mt-2"}>{description}</p>
    </div>
  )
}
const ITEMS = [{
  img: '/carousel/photo1.jpeg',
  label: 'COMMERCES ALIMENTAIRES',
  description: 'Qu&apos;ils soient Artisans, Boulangers, Primeurs, Traiteurs ou Restaurateurs, Nombreux sont les professionnels nous ayant fait confiance pour l&apos;acquisition ou la vente de leur affaire.'
}, {
  img: '/carousel/photo2.jpeg',
  label: 'LAVERIES-PRESSINGS',
  description: 'Acteur incontournable du secteur, notre cabinet compte plus de 600 clients en portefeuille et vous guide pour appréhender au mieux les pratiques de l&apos;activité (mises aux normes, rentabilité, étude financière).'
}, {
  img: '/carousel/photo3.jpeg',
  label: 'HOTELS',
  description: 'Un commercial spécialiste de ce domaine d&apos;activité vous conseillera sur toutes les spécificités du CHR (normes de sécurité, classement hôtelier) pour vous aider à faire les bons choix.'
}, {
  img: '/carousel/photo4.jpeg',
  label: 'FONDS DE COMMERCES',
  description: 'Nous mettons en relation et accompagnons les cédants et repreneurs (sélection des biens à vendre, visites, étude du bilan, respect des normes, démarches administratives, étude financière et recherche de financements).'
}, {
  img: '/carousel/photo5.jpeg',
  label: 'BÂTIMENTS PROFESSIONNELS',
  description: 'L&apos;Aventure immobilière vous guide également dans la transmission ou l&apos;acquisition de votre entreprise. Nous vous accompagnerons dans toutes les étapes de la transaction jusqu’à l’acte de vente.'
}, {
  img: '/carousel/photo7.jpeg',
  label: 'BAR-BRASSERIE-TABAC',
  description: 'Notre Cabinet, vous guide dans toutes les démarches spécifiques: normes d’hygiène, licences de débit de boissons, licences restaurant, demandes d’agrément, constitution des dossiers Douanes, paris sportifs, loterie, tabac,'
}, {
  img: '/carousel/photo8.jpeg',
  label: 'CESSION D&apos;ENTREPRISES TPE-PME',
  description: 'Nous vous accompagnons dans la création et le développement de votre entreprise; recherche de locaux à vendre ou à Louer, Terrains d&apos;activité, Zones commerciales, Bureaux, entrepôts.'
}]

export default function Home() {
  return (
    <>
      <div className={"hidden sm:inline-flex"}>
        <Carousel showArrows={true}>
          {
            ITEMS.map(item => <CarouselItem {...item} />)
          }
        </Carousel>
      </div>
      <div className={"flex flex-col text-sm sm:hidden"}>

          {
            ITEMS.map(item => <MobileItem {...item} />)
          }

      </div>

    </>
  )
}
