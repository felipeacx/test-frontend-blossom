"use client"

import { useCharacters } from "@/context/CharactersContextAPI"
import { SoftDeleteCharacterProps } from "@/models/globalModel"
import { AiFillDelete } from "react-icons/ai"

const SoftDeleteCharacter = ({ id }: SoftDeleteCharacterProps) => {
  const { characters, setCharacters } = useCharacters()
  const character = characters.find((char) => char.id === id)

  const onHandleSoftDelete = (id: string) => {
    setCharacters(
      characters.map((char) => (char.id === id ? { ...char, deleted: !char.deleted } : char))
    )
  }

  return (
    <div className="col-span-1 flex justify-start items-center cursor-pointer">
      {!character?.deleted ? (
        <AiFillDelete
          className="text-secondary-600 text-4xl rounded-3xl p-1"
          onClick={() => onHandleSoftDelete(id)}
        />
      ) : null}
    </div>
  )
}

export default SoftDeleteCharacter
