'use client'
import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Listbox as ListboxBase, Transition } from '@headlessui/react'
import  TYPES from '@/lib/dictionary'

export default function Listbox({
  placeholder = 'Choose',
  defaultSelected,
  loading = false,
  items,
  onChange = () => {}
}) {
  const [selected, setSelected] = useState(defaultSelected)
  return (
    <div className="w-[100%]">
      <ListboxBase
        value={selected}
        onChange={item => {
          setSelected(item)
          onChange(item)
        }}
      >
        <div className="relative mt-1">
          <ListboxBase.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-black">
              {
                loading
                  ? "Chargement"
                  : selected
                    ? selected.label
                    : placeholder
              }
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <i
                className="mt-1 text-gray-400 fa-solid fa-magnifying-glass"
                aria-hidden="true"
              />
            </span>
          </ListboxBase.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxBase.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map(item => (
                <ListboxBase.Option
                  key={item.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active || item.value === selected?.value ? 'bg-lime-100 text-neutral-500' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {() => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.label}
                      </span>
                    </>
                  )}
                </ListboxBase.Option>
              ))}
            </ListboxBase.Options>
          </Transition>
        </div>
      </ListboxBase>
    </div>
  )
}

export function ListboxAdvType({type, category}) {
  const router = useRouter()

  return (
    <div className="w-[200px]">
    <Listbox
      placeholder={"Tous les types de biens"}
      items={type !== 'ALL' ? [{label: "Tous les types de biens", value: "ALL"}, ...TYPES] : TYPES}
      defaultSelected={TYPES.find(({value}) => value === type)}
      onChange={item =>{
        router.push(`/advertisment/?type=${item.value}&category=${category}`)
      }}
    />
    </div>
  )
}

export function ListboxAdvCategory({categories, category, type}) {
  const router = useRouter()

  return (
    <div className="w-[200px]">
      <Listbox
        placeholder={"Toutes les catégories"}
        items={category !== 'ALL' ? [{label: "Toutes les catégories", value: "ALL"}, ...categories] : categories}
        defaultSelected={categories.find(({value}) => value === category)}
        onChange={item =>{
          router.push(`/advertisment/?category=${item.value}&type=${type}`)
        }}
      />
    </div>
  )
}
