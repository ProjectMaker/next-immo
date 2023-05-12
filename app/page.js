'use client'
import Image from "next/image"

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
      {
        ITEMS.map(item => <Item {...item} />)
      }

    </div>
  )
}
