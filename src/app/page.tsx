"use client"

import { GraphQLClient } from "graphql-request"
import { useEffect } from "react"
import { useCharacters } from "@/context/CharactersContextAPI"
import { charactersQuery, ENDPOINT } from "@/utils/constants"
import { CharactersResponse } from "@/models/globalModel"

export default function Home() {
  const { setCharacters } = useCharacters()

  useEffect(() => {
    const fetchData = async () => {
      const client = new GraphQLClient(ENDPOINT)
      const data = await client.request<CharactersResponse>(charactersQuery)
      const characters = data.characters.results.map((c) => ({ ...c, starred: false }))
      setCharacters(characters)
    }
    fetchData()
  }, [setCharacters])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl"></div>
    </main>
  )
}
