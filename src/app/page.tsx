"use client"

import { GraphQLClient } from "graphql-request"
import { useEffect, useMemo } from "react"
import { useCharacters } from "@/context/CharactersContextAPI"
import { charactersQuery, ENDPOINT } from "@/utils/constants"
import { CharactersResponse } from "@/models/globalModel"
import Image from "next/image"
import { AiFillHeart } from "react-icons/ai"

export default function Home() {
  const { setCharacters, characters, selectedCharacter } = useCharacters()

  useEffect(() => {
    const fetchData = async () => {
      const client = new GraphQLClient(ENDPOINT)
      const data = await client.request<CharactersResponse>(charactersQuery)
      const characters = data.characters.results.map((c) => ({ ...c, starred: false }))
      setCharacters(characters)
    }
    fetchData()
  }, [setCharacters])

  const selected = useMemo(
    () => characters.find((char) => char.id === selectedCharacter),
    [characters, selectedCharacter]
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-12 col-span-2">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {selected && (
          <div className="col-span-2 md:col-span-4 gap-5 flex flex-col">
            <div className="relative flex items-center justify-start">
              <Image
                className="rounded-full"
                src={selected.image}
                alt={selected.name}
                width={75}
                height={75}
              />
              {selected.starred && (
                <AiFillHeart className="absolute left-12 -bottom-2 text-4xl text-[#53C629] bg-white rounded-3xl p-1" />
              )}
            </div>
            <h2 className="text-2xl font-bold">{selected.name}</h2>
            <div>
              <p className="text-gray-900 font-bold">Specie</p>
              <p className="text-gray-500">{selected.species}</p>
            </div>
            <hr />
            <div>
              <p className="text-gray-900 font-bold">Status</p>
              <p className="text-gray-500">{selected.status}</p>
            </div>
            <hr />
            <div>
              <p className="text-gray-900 font-bold">Gender</p>
              <p className="text-gray-500">{selected.gender}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
