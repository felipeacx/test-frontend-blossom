"use client"

import { useCharacters } from "@/context/CharactersContextAPI"
import { SoftDeleteCharacterProps } from "@/models/globalModel"
import { MdRestore } from "react-icons/md"

const DeletedCharacter = ({ id }: SoftDeleteCharacterProps) => {
  const { characters, setCharacters } = useCharacters()
  const character = characters.find((char) => char.id === id)

  const onHandleSoftDelete = (id: string) => {
    setCharacters(
      characters.map((char) => (char.id === id ? { ...char, deleted: !char.deleted } : char))
    )
  }

  return (
    <>
      {character?.deleted && <div className="text-red-500 text-sm ml-4">Character deleted</div>}
      {character?.deleted && (
        <MdRestore
          className="ml-2 text-green-500 hover:text-green-700 cursor-pointer"
          onClick={() => onHandleSoftDelete(id)}
        />
      )}
    </>
  )
}

export default DeletedCharacter
