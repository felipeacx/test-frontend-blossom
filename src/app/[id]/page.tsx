import Image from "next/image"
import { AiFillHeart } from "react-icons/ai"
import { Character, CharacterDetailPageProps, CharactersResponse } from "@/models/globalModel"
import { GraphQLClient } from "graphql-request"
import { characterQuery, charactersQuery, ENDPOINT } from "@/utils/constants"

// Generate static params for all character IDs
export async function generateStaticParams() {
  try {
    // Fetch all characters to get their IDs
    const client = new GraphQLClient(ENDPOINT)
    const data = await client.request<CharactersResponse>(charactersQuery)
    const characters = data.characters.results

    return characters.map((char) => ({
      id: char.id,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    throw new Error(`Characters not found.`)
  }
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
              {selected.starred && (
                <AiFillHeart className="absolute left-12 -bottom-2 text-4xl text-[#53C629] bg-white rounded-3xl p-1" />
              )}
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
          </div>
        )}
      </div>
    </main>
  )
}
