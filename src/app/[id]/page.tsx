import Image from "next/image"
import { Character, CharacterDetailPageProps, CharactersResponse } from "@/models/globalModel"
import { GraphQLClient } from "graphql-request"
import { characterQuery, charactersQuery, ENDPOINT } from "@/utils/constants"
import CharactersComments from "@/components/CharactersComments"
import FavouriteCharacter from "@/components/FavouriteCharacter"
import SoftDeleteCharacter from "@/components/SoftDeleteCharacter"
import DeletedCharacter from "@/components/DeletedCharacter"
import { MdKeyboardBackspace } from "react-icons/md"
import Link from "next/link"

export async function generateStaticParams() {
  const client = new GraphQLClient(ENDPOINT)
  const data = await client.request<CharactersResponse>(charactersQuery)
  const characters = data.characters.results

  return characters.map((char) => ({
    id: char.id,
  }))
}

// Function to fetch single character data
async function getCharacter(id: string): Promise<Character | null> {
  try {
    const client = new GraphQLClient(ENDPOINT)
    const data: { character: Character } = await client.request(characterQuery, { id })
    return data.character
  } catch (error) {
    console.error("Error fetching character:", error)
    return null
  }
}

export default async function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  const { id } = params
  // Fetch the character data
  const selected = await getCharacter(id)

  if (!selected) {
    throw new Error(`Character with ID ${id} not found.`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-12 col-span-2">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
        <Link href="/" aria-label="Go back" className="block md:hidden">
          <MdKeyboardBackspace className="text-4xl text-primary-600 hover:text-primary-700" />
        </Link>
        {selected && (
          <div className="col-span-2 md:col-span-4 gap-5 flex flex-col">
            <div className="relative flex items-center justify-start">
              <Image
                className="rounded-full"
                src={selected.image}
                alt={selected.name}
                width={75}
                height={75}
              />
              <FavouriteCharacter id={selected.id} />
              <DeletedCharacter id={selected.id} />
            </div>
            <h2 className="text-2xl font-bold">{selected.name}</h2>
            <div>
              <p className="text-gray-900 font-bold">Specie</p>
              <p className="text-gray-500">{selected.species}</p>
            </div>
            <hr />
            <div>
              <p className="text-gray-900 font-bold">Status</p>
              <p className="text-gray-500">{selected.status}</p>
            </div>
            <hr />
            <div>
              <p className="text-gray-900 font-bold">Gender</p>
              <p className="text-gray-500">{selected.gender}</p>
            </div>
            <div>
              <p className="text-gray-900 font-bold">Comments</p>
              <CharactersComments id={selected.id} />
            </div>
            <SoftDeleteCharacter id={selected.id} />
          </div>
        )}
      </div>
    </main>
  )
}
