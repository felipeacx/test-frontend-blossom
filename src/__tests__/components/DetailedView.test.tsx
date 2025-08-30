import React from "react"
import { render, screen } from "@testing-library/react"
import { useParams } from "next/navigation"
import DetailedView from "../../components/DetailedView"

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}))

// Mock CharactersContextAPI
jest.mock("../../context/CharactersContextAPI", () => ({
  CharactersProvider: ({ children }: { children: React.ReactNode }) => children,
  useCharacters: () => ({
    characters: [
      {
        id: 1,
        name: "Test Character",
        status: "Alive",
        species: "Human",
        gender: "Male",
        origin: { name: "Earth" },
        location: { name: "Earth" },
        image: "test-image.jpg",
      },
    ],
    loading: false,
    error: null,
  }),
}))

describe("DetailedView", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders without crashing", () => {
    void (useParams as jest.Mock).mockReturnValue({ id: "1" })
    render(<DetailedView />)
  })

  test("displays character information when available", () => {
    void (useParams as jest.Mock).mockReturnValue({ id: "1" })
    render(<DetailedView />)
    expect(screen.getByRole("main")).toBeInTheDocument()
  })

  test("handles character not found", () => {
    void (useParams as jest.Mock).mockReturnValue({ id: "999" })
    render(<DetailedView />)
    screen.debug()
    expect(screen.getByRole("main")).toBeInTheDocument()
  })
})
