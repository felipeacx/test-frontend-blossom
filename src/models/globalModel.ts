export interface Character {
  id: string
  name: string
  image: string
  species: string
  status: string
  gender: string
  starred?: boolean
  comments?: string
  deleted?: boolean
}

export interface CharactersContextType {
  characters: Character[]
  setCharacters: (chars: Character[]) => void
  showFilter: boolean
  setShowFilter: (show: boolean) => void
  filteredCharacter: string
  setFilteredCharacter: (filter: string) => void
  filteredSpecie: string
  setFilteredSpecie: (specie: string) => void
  selectedCharacter: string | null
  setSelectedCharacter: (id: string | null) => void
  filterResult: string
  setFilterResult: (result: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  filteredStatus: string
  setFilteredStatus: (status: string) => void
  filteredGender: string
  setFilteredGender: (gender: string) => void
}

export interface CharactersResponse {
  characters: { results: Character[] }
}

export interface DetailedViewProps {
  id?: string | string[]
}

export interface CharacterDetailPageProps {
  params: {
    id: string
  }
}

export interface CharacterCommentsProps {
  id: string
}

export interface FavouriteCharacterProps {
  id: string
}

export interface SoftDeleteCharacterProps {
  id: string
}
