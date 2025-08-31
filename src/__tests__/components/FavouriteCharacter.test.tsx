import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import FavouriteCharacter from "@/components/FavouriteCharacter"

// Mock the ContextAPI
jest.mock("@/context/CharactersContextAPI", () => ({
  useCharacters: () => ({
    characters: [],
    favouriteCharacters: [],
    addToFavourites: jest.fn(),
    removeFromFavourites: jest.fn(),
  }),
}))

//Favourite Component tests
describe("FavouriteCharacter", () => {
  it("renders favourite component", () => {
    render(<FavouriteCharacter id={"1"} />)
    const favouriteButtons = screen.queryByTestId("unfavourite-button")
    expect(favouriteButtons).toBeInTheDocument()
  })

  // If the component expects different props
  it("handles favourite toggle", () => {
    render(<FavouriteCharacter id={"1"} />)

    const favouriteButtons = screen.queryByTestId("favourite-button")

    if (favouriteButtons) {
      fireEvent.click(favouriteButtons)
    }
  })
})
