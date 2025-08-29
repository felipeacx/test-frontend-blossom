export interface Character {
  id: string
  name: string
  image: string
  species: string
  status: string
  gender: string
}

export interface CharactersContextType {
  characters: Character[]
  setCharacters: (chars: Character[]) => void
}

export interface CharactersResponse {
  characters: { results: Character[] }
}
