"use client"

import { useCharacters } from "@/context/CharactersContextAPI"
import { CharacterCommentsProps } from "@/models/globalModel"

const CharactersComments = ({ id }: CharacterCommentsProps) => {
  const { characters, setCharacters } = useCharacters()
  const character = characters.find((char) => char.id === id)

  const onEditComments = (comments: string) => {
    if (!character?.deleted) {
      setCharacters(characters.map((char) => (char.id === id ? { ...char, comments } : char)))
    }
  }

  return (
    <input
      className="text-gray-500 border border-gray-300 rounded-md p-1 w-full"
      type="text"
      value={character?.comments}
      onChange={(e) => onEditComments(e.target.value)}
    />
  )
}

export default CharactersComments
