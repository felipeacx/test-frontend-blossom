"use client"

import { Character, CharactersContextType } from "@/models/globalModel"
import React, { createContext, useContext, useState, ReactNode } from "react"

const CharactersContext = createContext<CharactersContextType | undefined>(undefined)

export const CharactersProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [showFilter, setShowFilter] = useState(false)
  const [filteredCharacter, setFilteredCharacter] = useState<string>("all")
  const [filteredSpecie, setFilteredSpecie] = useState<string>("all")
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>("")
  const [filterResult, setFilterResult] = useState<string>("")

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
