"use client"

import { useCharacters } from "@/context/CharactersContextAPI"
import { Character } from "@/models/globalModel"
import Image from "next/image"
import React, { useMemo } from "react"
import { FiSearch } from "react-icons/fi"
import { PiSliders } from "react-icons/pi"
import { FiHeart } from "react-icons/fi"

const NavigationBar: React.FC = () => {
  const { characters, setCharacters } = useCharacters()

  const memoizedCharacters = useMemo(() => characters, [characters])

  return (
    <nav className="w-1/3 backdrop-blur-lg shadow-lg flex flex-col">
      <div className="flex items-center justify-between px-2 py-4 m-4">
        <div className="text-2xl font-bold flex-1 text-center">Rick and Morty list</div>
      </div>
      <div className="relative m-4">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-[#6B7280] cursor-pointer" />
        <input
          type="text"
          className="w-full pl-12 pr-10 py-4 rounded-lg border bg-[#F3F4F6] h-[52px] text-[#6B7280] text-sm leading-5"
          placeholder="Search or filter results"
        />
        <PiSliders className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-primary-600 cursor-pointer" />
      </div>
      <ul className="p-4 grid grid-cols-6 gap-3 overflow-auto h-[calc(100svh-180px)]">
        <li className="col-span-6 h-[56px] flex justify-start items-center pl-5">
          <p className="text-xs leading-4 uppercase text-gray-500 tracking-[5%]">
            Characters ({memoizedCharacters.length})
          </p>
        </li>
        {memoizedCharacters.map((char: Character) => (
          <li className="col-span-6 grid grid-cols-6 border-t pt-2 h-[74px]" key={char.id}>
            <div className="col-span-1 flex items-center justify-center">
              <Image
                className="rounded-3xl"
                src={char.image}
                alt={char.name}
                width={32}
                height={32}
              />
            </div>
            <div className="flex items-center justify-start col-span-4">
              <div className="flex flex-col">
                <p className="text-gray-900 font-bold">{char.name}</p>
                <p className="text-gray-500">{char.species}</p>
              </div>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <FiHeart className="text-2xl" />
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavigationBar
