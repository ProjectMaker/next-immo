'use client'
import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Popover } from '@headlessui/react'
import classNames from "classnames"

const MenuLink = ({href, icon, children}) => {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={classNames('rounded-md px-3 py-2 text-sm font-medium', pathname === href ? 'bg-neutral-500 text-white' : 'text-neutral-500 bg-white border-2 border-lime-400')}
      aria-current="page"
    >
      <div className="flex items-center">
        <i className={`fa-solid fa-${icon} fa-xl mr-2`}/>
        <span className="text-xs">{children}</span>
      </div>
    </Link>
  )
}

function BurgerMenuLink({href, icon, children}) {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={classNames('px-3 py-2 text-sm font-medium  bg-white', pathname === href ? 'text-lime-400' : 'text-neutral-500')}
      aria-current="page"
    >
      <div className="flex items-center">
        <i className={`fa-solid fa-${icon} mr-2`}/>
        <span>{children}</span>
      </div>
    </Link>
  )
}

export function BurgerMenu() {
  const pathname = usePathname()
  const label = useMemo(() => {
    if (pathname === '/') {
      return "Accueil"
    } else if (pathname === '/advertisment') {
      return "Acheter / Louer"
    } else if (pathname === '/fees') {
      return "Nos honoraires"
    } else if (pathname === '/services') {
      return "Nos services"
    }
  }, [pathname])
  return (
    <Popover className="relative">
      <Popover.Button>
        <div className="flex items-center">
          <i className="text-neutral-500 fa fa-burger fa-xl" />
          <div className="text-neutral-500 text-sm ml-2"> {label}</div>
        </div>
      </Popover.Button>

      <Popover.Panel className="absolute z-10">
        <div className={"flex flex-col rounded-md border-2 border-lime-400"}>
          <BurgerMenuLink href={"/"} icon={'home'}>Accueil</BurgerMenuLink>
          <BurgerMenuLink href={"/advertisment"} icon={'people-roof'}>Acheter / Louer</BurgerMenuLink>
          <BurgerMenuLink href={"/fees"} icon='comments'>Nos honoraires</BurgerMenuLink>
          <BurgerMenuLink href={"/services"} icon="handshake">Nos services</BurgerMenuLink>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

export default function Menu()  {
  return (
    <nav className="flex flex-wrap items-baseline space-x-4">
      <MenuLink href={"/"} icon={'home'}>Accueil</MenuLink>
      <MenuLink href={"/advertisment"} icon={'people-roof'}>Acheter / Louer</MenuLink>
      <MenuLink href={"/fees"} icon='comments'>Nos honoraires</MenuLink>
      <MenuLink href={"/services"} icon="handshake">Nos services</MenuLink>
    </nav>
  )
}
