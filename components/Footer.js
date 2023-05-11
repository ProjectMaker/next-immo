import Image from "next/image";
export default function Footer() {
  return (
    <footer className="container mx-auto
             invisible md:visible
             bg-white
             text-black text-center
             fixed
             inset-x-0
             bottom-0
             p-1">
      <div className="flex items-center justify-between">
        <div className="text-sm ml-4" >L'Aventure Immobilière - 27 rue Francois de Tessan - 77330 Ozoir la Ferrière - Tél : 01 60 02 76 24 - Email : contact.ai@sfr.fr</div>

        <div className="flex items-center mr-4">
          <div className="text-sm mr-2" >Recommandé par</div>
          <Image src={"/fnaim.png"} alt="fnaim" width={51} height={36}/>
        </div>
      </div>
    </footer>
  )
}
