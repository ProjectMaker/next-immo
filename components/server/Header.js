import Image from 'next/image'
import Menu, {BurgerMenu} from '../client/Menu'

export default function Header() {
  return (
    <header className="container mx-auto flex flex-col items-baseline justify-between lg:flex-row lg:items-end bg-white">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <div className="m-2">
        <Image
          src="/logo.png"
          alt="Aventure immobilière Logo"
          width={409}
          height={153}
          priority
        />
      </div>
      <div className="mb-3 mr-4">
        <div className="hidden md:inline-flex"><Menu/></div>
        <div className="visible md:invisible"><BurgerMenu/></div>
      </div>
    </header>
  )
}
