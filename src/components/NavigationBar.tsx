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
import { useRouter } from "next/navigation"

const NavigationBar: React.FC = () => {
  const router = useRouter()
  const {
    characters,
    setCharacters,
    setShowFilter,
    showFilter,
    filteredCharacter,
    filteredSpecie,
    filterResult,
    setFilterResult,
    setSelectedCharacter,
    selectedCharacter,
    sortBy,
  } = useCharacters()

  // Memoized filter for non-starred characters
  const memoizedCharacters = useMemo(() => {
    const filteredCharacters = characters.filter((char) => {
      const isNotStarred = !char.starred
      const matchesCharacter =
        filteredCharacter === "all"
          ? isNotStarred
          : filteredCharacter === "starred"
          ? false
          : filteredCharacter === "others" && isNotStarred
      const matchesSpecies =
        filteredSpecie !== "all"
          ? char.species.toLowerCase().includes(filteredSpecie.toLowerCase())
          : true
      const matchesSearch =
        char.name.toLowerCase().includes(filterResult.toLowerCase()) && isNotStarred
      return matchesCharacter && matchesSpecies && matchesSearch
    })
    if (sortBy === "A-Z") {
      filteredCharacters.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "Z-A") {
      filteredCharacters.sort((a, b) => b.name.localeCompare(a.name))
    }
    return filteredCharacters
  }, [characters, filteredCharacter, filteredSpecie, filterResult, sortBy])

  // Memoized filter for starred characters
  const memoizedFavouriteCharacters = useMemo(() => {
    const filteredCharacters = characters.filter((char) => {
      const isStarred = char.starred
      const matchesCharacter =
        filteredCharacter === "starred"
          ? isStarred
          : filteredCharacter === "all"
          ? isStarred
          : filteredCharacter === "others" && !isStarred
      const matchesSpecies =
        filteredSpecie !== "all"
          ? char.species.toLowerCase().includes(filteredSpecie.toLowerCase())
          : true
      const matchesSearch =
        char.name.toLowerCase().includes(filterResult.toLowerCase()) && isStarred
      return matchesCharacter && matchesSpecies && matchesSearch
    })
    if (sortBy === "A-Z") {
      filteredCharacters.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "Z-A") {
      filteredCharacters.sort((a, b) => b.name.localeCompare(a.name))
    }
    return filteredCharacters
  }, [characters, filteredCharacter, filteredSpecie, filterResult, sortBy])

  const onClickFilter = () => {
    setShowFilter(!showFilter)
  }

  const onHandleFavorite = (id: string) => {
    setCharacters(
      characters.map((char) => (char.id === id ? { ...char, starred: !char.starred } : char))
    )
  }

  const onClickCharacter = (id: string) => {
    setSelectedCharacter(id)
    router.push(`/${id}`)
  }

  const filterCount =
    (filteredCharacter !== "all" ? 1 : 0) +
    (filteredSpecie !== "all" ? 1 : 0) +
    (filterResult !== "" ? 1 : 0)

  return (
    <nav className="backdrop-blur-lg shadow-lg flex flex-col col-span-1">
      <div className="flex items-center justify-between px-2 py-4 m-4">
        <div className="text-2xl font-bold flex-1 text-center">Rick and Morty list</div>
      </div>
      <div className="relative m-4">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-[#6B7280] cursor-pointer" />
        <input
          type="text"
          className="w-full pl-12 pr-10 py-4 rounded-lg border bg-[#F3F4F6] h-[52px] text-[#6B7280] text-sm leading-5"
          placeholder="Search or filter results"
          value={filterResult}
          onChange={(e) => setFilterResult(e.target.value)}
        />
        <PiSliders
          onClick={onClickFilter}
          className={
            "absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-primary-600 cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out" +
            (showFilter && " bg-primary-100 rounded-md")
          }
        />
        <FilterCharacters />
      </div>
      {filterCount > 0 && (
        <div className="flex justify-between items-center px-4">
          <p className="px-4 text-[#2563EB] font-bold">
            {memoizedCharacters.length + memoizedFavouriteCharacters.length}{" "}
            {memoizedCharacters.length + memoizedFavouriteCharacters.length === 1
              ? " Result"
              : " Results"}
          </p>
          <p className="px-4 font-bold text-[#3B8520] bg-[#63D83833] rounded-lg py-2">
            {filterCount} {filterCount === 1 ? "Filter" : "Filters"}
          </p>
        </div>
      )}
      <ul className="p-4 grid grid-cols-6 gap-3 overflow-auto max-h-[calc(100svh-180px)]">
        {memoizedFavouriteCharacters.length > 0 && (
          <>
            <li className="col-span-6 h-[56px] flex justify-start items-center pl-5">
              <p className="text-xs leading-4 uppercase text-gray-500 tracking-[5%]">
                Starred Characters ({memoizedFavouriteCharacters.length})
              </p>
            </li>
            {memoizedFavouriteCharacters.map((char: Character) => (
              <li
                className={
                  "col-span-6 grid grid-cols-6 border-t py-2 h-[74px] " +
                  (selectedCharacter === char.id ? "bg-primary-100 rounded-lg" : "")
                }
                key={char.id}
              >
                <div
                  className="col-span-1 flex items-center justify-center cursor-pointer"
                  onClick={() => onClickCharacter(char.id)}
                >
                  <Image
                    className="rounded-3xl"
                    src={char.image}
                    alt={char.name}
                    width={32}
                    height={32}
                  />
                </div>
                <div
                  className="flex items-center justify-start col-span-4 cursor-pointer"
                  onClick={() => onClickCharacter(char.id)}
                >
                  <div className="flex flex-col">
                    <p className="text-gray-900 font-bold">{char.name}</p>
                    <p className="text-gray-500">{char.species}</p>
                  </div>
                </div>
                <div className="col-span-1 flex justify-center items-center cursor-pointer">
                  {char.deleted ? (
                    <div className="text-red-500 text-sm">Deleted</div>
                  ) : char.starred ? (
                    <AiFillHeart
                      className="text-4xl text-[#53C629] bg-white rounded-3xl p-1"
                      onClick={() => onHandleFavorite(char.id)}
                    />
                  ) : (
                    <FiHeart className="text-2xl" onClick={() => onHandleFavorite(char.id)} />
                  )}
                </div>
              </li>
            ))}
          </>
        )}
        {memoizedCharacters.length > 0 && (
          <>
            <li className="col-span-6 h-[56px] flex justify-start items-center pl-5">
              <p className="text-xs leading-4 uppercase text-gray-500 tracking-[5%]">
                Characters ({memoizedCharacters.length})
              </p>
            </li>
            {memoizedCharacters.map((char: Character) => (
              <li
                className={
                  "col-span-6 grid grid-cols-6 border-t py-2 h-[74px] " +
                  (selectedCharacter === char.id ? "bg-primary-100 rounded-lg" : "")
                }
                key={char.id}
              >
                <div
                  className="col-span-1 flex items-center justify-center cursor-pointer"
                  onClick={() => onClickCharacter(char.id)}
                >
                  <Image
                    className="rounded-3xl"
                    src={char.image}
                    alt={char.name}
                    width={32}
                    height={32}
                  />
                </div>
                <div
                  className="flex items-center justify-start col-span-4 cursor-pointer"
                  onClick={() => onClickCharacter(char.id)}
                >
                  <div className="flex flex-col">
                    <p className="text-gray-900 font-bold">{char.name}</p>
                    <p className="text-gray-500">{char.species}</p>
                  </div>
                </div>
                <div className="col-span-1 flex justify-center items-center cursor-pointer">
                  {char.deleted ? (
                    <div className="text-red-500 text-sm">Deleted</div>
                  ) : char.starred ? (
                    <AiFillHeart
                      className="text-4xl text-[#53C629] bg-white rounded-3xl p-1"
                      onClick={() => onHandleFavorite(char.id)}
                    />
                  ) : (
                    <FiHeart className="text-2xl" onClick={() => onHandleFavorite(char.id)} />
                  )}
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavigationBar
