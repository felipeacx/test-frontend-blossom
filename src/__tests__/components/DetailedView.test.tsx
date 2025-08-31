import React from "react"
import { render, screen, waitFor } from "@testing-library/react"

// Mock all the dependencies
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} className={className} {...props} />
  ),
}))
// Mock the notFound function
const mockNotFound = jest.fn()
jest.mock("next/navigation", () => ({
  notFound: mockNotFound,
}))
// Mock the AiFillHeart icon
jest.mock("react-icons/ai", () => ({
  AiFillHeart: () => <div data-testid="heart-icon">❤️</div>,
}))

// Mock the GraphQL client
const mockRequest = jest.fn()
jest.mock("graphql-request", () => ({
  GraphQLClient: jest.fn().mockImplementation(() => ({
    request: mockRequest,
  })),
}))

// Mock the constants
jest.mock("../../utils/constants", () => ({
  ENDPOINT: "https://rickandmortyapi.com/graphql",
  characterQuery: "mocked query",
}))

// Testing CharacterDetailPage
import CharacterDetailPage from "../../app/[id]/page"

describe("CharacterDetailPage", () => {
  // Mock character data
  const mockCharacter = {
    id: "1",
    name: "Rick Sanchez",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    species: "Human",
    status: "Alive",
    gender: "Male",
    starred: true,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Setup default successful response
    mockRequest.mockResolvedValue({ character: mockCharacter })
  })

  test("renders character details page with valid ID", async () => {
    const params = { id: "5" }

    const component = await CharacterDetailPage({ params })
    render(component)

    // Expected character details to be rendered
    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument()
    })
    expect(screen.getByText("Human")).toBeInTheDocument()
    expect(screen.getByText("Alive")).toBeInTheDocument()
    expect(screen.getByText("Male")).toBeInTheDocument()
    expect(screen.getByRole("main")).toBeInTheDocument()
  })

  test("displays character species correctly", async () => {
    const params = { id: "1" }

    const component = await CharacterDetailPage({ params })
    render(component)
    // Expected character species to be rendered
    await waitFor(() => {
      expect(screen.getByText("Specie")).toBeInTheDocument()
    })
    expect(screen.getByText("Human")).toBeInTheDocument()
  })

  test("displays character status correctly", async () => {
    const params = { id: "1" }

    const component = await CharacterDetailPage({ params })
    render(component)

    await waitFor(() => {
      expect(screen.getByText("Status")).toBeInTheDocument()
    })
    expect(screen.getByText("Alive")).toBeInTheDocument()
  })

  test("displays character gender correctly", async () => {
    const params = { id: "1" }

    const component = await CharacterDetailPage({ params })
    render(component)

    await waitFor(() => {
      expect(screen.getByText("Gender")).toBeInTheDocument()
    })
    expect(screen.getByText("Male")).toBeInTheDocument()
  })

  test("displays character name correctly", async () => {
    const params = { id: "1" }

    const component = await CharacterDetailPage({ params })
    render(component)

    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument()
    })
  })

  test("displays character image correctly", async () => {
    const params = { id: "1" }

    const component = await CharacterDetailPage({ params })
    render(component)

    await waitFor(() => {
      const image = screen.getByAltText("Rick Sanchez")
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute(
        "src",
        "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
      )
    })
  })
})
