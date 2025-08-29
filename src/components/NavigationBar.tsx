"use client"

import { useCharacters } from "@/context/CharactersContextAPI"
import { Character } from "@/models/globalModel"
import Image from "next/image"
import React, { useMemo } from "react"
import { FiSearch } from "react-icons/fi"
import { PiSliders } from "react-icons/pi"
import { FiHeart } from "react-icons/fi"
import FilterCharacters from "./FilterCharacters"
import { AiFillHeart } from "react-icons/ai"

const NavigationBar: React.FC = () => {
  const { characters, setShowFilter, showFilter, filteredCharacter, filteredSpecie } =
    useCharacters()

  // Memoized filter calculations
  const memoizedCharacters = useMemo(() => {
    return characters.filter((char) => {
      const matchesName =
        filteredCharacter && filteredCharacter === "all"
          ? !char.starred
          : filteredCharacter === "others"
          ? true
          : filteredCharacter === "starred" && char.starred
      const matchesSpecies =
        filteredSpecie && filteredSpecie !== "all"
          ? char.species.toLowerCase().includes(filteredSpecie.toLowerCase())
          : true
      return matchesName && matchesSpecies
    })
  }, [characters, filteredCharacter, filteredSpecie])

  const onClickFilter = () => {
    setShowFilter(!showFilter)
  }

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
        <PiSliders
          onClick={onClickFilter}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-primary-600 cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out hover:bg-primary-100 hover:rounded-lg"
        />
        <FilterCharacters />
      </div>
      <ul className="p-4 grid grid-cols-6 gap-3 overflow-auto max-h-[calc(100svh-180px)]">
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
              {char.starred ? (
                <AiFillHeart className="text-4xl text-[#53C629] bg-white rounded-3xl p-1" />
              ) : (
                <FiHeart className="text-2xl" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavigationBar
