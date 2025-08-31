"use client"

import { useCharacters } from "@/context/CharactersContextAPI"
import { FavouriteCharacterProps } from "@/models/globalModel"
import { AiFillHeart } from "react-icons/ai"
import { FiHeart } from "react-icons/fi"

const FavouriteCharacter = ({ id }: FavouriteCharacterProps) => {
  const { characters, setCharacters } = useCharacters()
  const character = characters.find((char) => char.id === id)

  const onHandleFavorite = (id: string) => {
    if (!character?.deleted) {
      setCharacters(
        characters.map((char) => (char.id === id ? { ...char, starred: !char.starred } : char))
      )
    }
  }

  return (
    <div className="col-span-1 flex justify-center items-center cursor-pointer">
      {character?.starred ? (
        <AiFillHeart
          data-testid="favourite-button"
          className="absolute left-12 -bottom-2 text-4xl text-[#53C629] bg-white rounded-3xl p-1"
          onClick={() => onHandleFavorite(id)}
        />
      ) : (
        <FiHeart
          data-testid="unfavourite-button"
          className="absolute left-12 text-secondary-600 -bottom-2 text-4xl rounded-3xl p-1"
          onClick={() => onHandleFavorite(id)}
        />
      )}
    </div>
  )
}

export default FavouriteCharacter
