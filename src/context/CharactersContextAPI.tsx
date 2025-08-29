"use client"

import { Character, CharactersContextType } from "@/models/globalModel"
import React, { createContext, useContext, useState, ReactNode } from "react"

const CharactersContext = createContext<CharactersContextType | undefined>(undefined)

export const CharactersProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<Character[]>([])
  return (
    <CharactersContext.Provider value={{ characters, setCharacters }}>
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
