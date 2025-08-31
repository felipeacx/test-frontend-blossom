"use client"

import { Character, CharactersContextType, CharactersResponse } from "@/models/globalModel"
import { charactersQuery, ENDPOINT } from "@/utils/constants"
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { GraphQLClient } from "graphql-request"

const CharactersContext = createContext<CharactersContextType | undefined>(undefined)

export const CharactersProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [showFilter, setShowFilter] = useState(false)
  const [filteredCharacter, setFilteredCharacter] = useState<string>("all")
  const [filteredSpecie, setFilteredSpecie] = useState<string>("all")
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>("")
  const [filterResult, setFilterResult] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("")
  const [filteredStatus, setFilteredStatus] = useState<string>("all")
  const [filteredGender, setFilteredGender] = useState<string>("all")

  useEffect(() => {
    const fetchData = async () => {
      const client = new GraphQLClient(ENDPOINT)
      const data = await client.request<CharactersResponse>(charactersQuery)
      const characters = data.characters.results.map((c: Character) => ({
        ...c,
        starred: false,
        comments: "",
        deleted: false,
      }))
      setCharacters(characters)
    }
    fetchData()
  }, [setCharacters])

  return (
    <CharactersContext.Provider
      value={{
        characters,
        setCharacters,
        showFilter,
        setShowFilter,
        filteredCharacter,
        setFilteredCharacter,
        filteredSpecie,
        setFilteredSpecie,
        selectedCharacter,
        setSelectedCharacter,
        filterResult,
        setFilterResult,
        sortBy,
        setSortBy,
        filteredStatus,
        setFilteredStatus,
        filteredGender,
        setFilteredGender,
      }}
    >
      {children}
    </CharactersContext.Provider>
  )
}

export const useCharacters = () => {
  const context = useContext(CharactersContext)
  if (!context) {
    throw new Error("useCharacters must be used within a CharactersProvider")
  }
  return context
}
