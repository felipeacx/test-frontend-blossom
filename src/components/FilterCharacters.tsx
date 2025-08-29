import { useCharacters } from "@/context/CharactersContextAPI"

const FilterCharacters = () => {
  const { showFilter, filteredCharacter, filteredSpecie, setFilteredCharacter, setFilteredSpecie } =
    useCharacters()

  const onClickCharacterFilter = (filter: string) => {
    setFilteredCharacter(filter)
  }

  const onClickSpecieFilter = (filter: string) => {
    setFilteredSpecie(filter)
  }

  return (
    <>
      {showFilter && (
        <div className="absolute bg-white rounded-b shadow-lg rounded rounded-t-none p-4 w-full">
          <p className="text-gray-500 text-sm leading-5">Character</p>
          <div className="grid grid-cols-3 gap-3 py-3">
            <button
              className={
                "border rounded-lg px-2 py-4" +
                (filteredCharacter === "all" &&
                  " bg-primary-100 text-primary-600 border-primary-100")
              }
              onClick={() => onClickCharacterFilter("all")}
            >
              All
            </button>
            <button
              className={
                "border rounded-lg px-2 py-4" +
                (filteredCharacter === "starred" &&
                  " bg-primary-100 text-primary-600 border-primary-100")
              }
              onClick={() => onClickCharacterFilter("starred")}
            >
              Starred
            </button>
            <button
              className={
                "border rounded-lg px-2 py-4" +
                (filteredCharacter === "others" &&
                  " bg-primary-100 text-primary-600 border-primary-100")
              }
              onClick={() => onClickCharacterFilter("others")}
            >
              Others
            </button>
          </div>
          <p className="text-gray-500 text-sm leading-5">Specie</p>
          <div className="grid grid-cols-3 gap-3 py-3">
            <button
              className={
                "border rounded-lg px-2 py-4" +
                (filteredSpecie === "all" && " bg-primary-100 text-primary-600 border-primary-100")
              }
              onClick={() => onClickSpecieFilter("all")}
            >
              All
            </button>
            <button
              className={
                "border rounded-lg px-2 py-4" +
                (filteredSpecie === "human" &&
                  " bg-primary-100 text-primary-600 border-primary-100")
              }
              onClick={() => onClickSpecieFilter("human")}
            >
              Human
            </button>
            <button
              className={
                "border rounded-lg px-2 py-4" +
                (filteredSpecie === "alien" &&
                  " bg-primary-100 text-primary-600 border-primary-100")
              }
              onClick={() => onClickSpecieFilter("alien")}
            >
              Alien
            </button>
          </div>
          <div className="flex justify-center items-center p-4">
            <p className="text-gray-500 text-sm leading-5">Filter</p>
          </div>
        </div>
      )}
    </>
  )
}

export default FilterCharacters
