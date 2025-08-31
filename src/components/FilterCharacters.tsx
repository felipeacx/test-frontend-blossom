import { useCharacters } from "@/context/CharactersContextAPI"

const FilterCharacters = () => {
  const {
    showFilter,
    filteredCharacter,
    filteredSpecie,
    setFilteredCharacter,
    setFilteredSpecie,
    sortBy,
    setSortBy,
    filteredStatus,
    setFilteredStatus,
    filteredGender,
    setFilteredGender,
  } = useCharacters()

  const onClickCharacterFilter = (filter: string) => {
    setFilteredCharacter(filter)
  }

  const onClickSpecieFilter = (filter: string) => {
    setFilteredSpecie(filter)
  }

  const onClickStatusFilter = (filter: string) => {
    setFilteredStatus(filter)
  }

  const onClickGenderFilter = (filter: string) => {
    setFilteredGender(filter)
  }

  return (
    <>
      {showFilter && (
        <div className="absolute bg-white rounded-b shadow-lg rounded rounded-t-none p-4 w-full">
          <p className="text-gray-500 text-sm leading-5">Sort By</p>
          <div className="grid grid-cols-3 gap-3 py-3">
            <button
              className={
                "border rounded-lg px-2 py-4" +
                (sortBy === "" && " bg-primary-100 text-primary-600 border-primary-100")
              }
              onClick={() => setSortBy("")}
            >
              Default
            </button>
            <button
              className={
                "border rounded-lg px-2 py-4" +
                (sortBy === "A-Z" && " bg-primary-100 text-primary-600 border-primary-100")
              }
              onClick={() => setSortBy("A-Z")}
            >
              A-Z
            </button>
            <button
              className={
                "border rounded-lg px-2 py-4" +
                (sortBy === "Z-A" && " bg-primary-100 text-primary-600 border-primary-100")
              }
              onClick={() => setSortBy("Z-A")}
            >
              Z-A
            </button>
          </div>
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
          <p className="text-gray-500 text-sm leading-5">Status</p>
          <div className="grid grid-cols-3 gap-3 py-3">
            <button
              className={
                "border rounded-lg px-2 py-4" +
                (filteredStatus === "all" && " bg-primary-100 text-primary-600 border-primary-100")
              }
              onClick={() => onClickStatusFilter("all")}
            >
              All
            </button>
            <button
              className={
                "border rounded-lg px-2 py-4" +
                (filteredStatus === "alive" &&
                  " bg-primary-100 text-primary-600 border-primary-100")
              }
              onClick={() => onClickStatusFilter("alive")}
            >
              Alive
            </button>
            <button
              className={
                "border rounded-lg px-2 py-4" +
                (filteredStatus === "dead" && " bg-primary-100 text-primary-600 border-primary-100")
              }
              onClick={() => onClickStatusFilter("dead")}
            >
              Dead
            </button>
          </div>
          <p className="text-gray-500 text-sm leading-5">Gender</p>
          <div className="grid grid-cols-3 gap-3 py-3">
            <button
              className={
                "border rounded-lg px-2 py-4" +
                (filteredGender === "all" && " bg-primary-100 text-primary-600 border-primary-100")
              }
              onClick={() => onClickGenderFilter("all")}
            >
              All
            </button>
            <button
              className={
                "border rounded-lg px-2 py-4" +
                (filteredGender === "male" && " bg-primary-100 text-primary-600 border-primary-100")
              }
              onClick={() => onClickGenderFilter("male")}
            >
              Male
            </button>
            <button
              className={
                "border rounded-lg px-2 py-4" +
                (filteredGender === "female" &&
                  " bg-primary-100 text-primary-600 border-primary-100")
              }
              onClick={() => onClickGenderFilter("female")}
            >
              Female
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
