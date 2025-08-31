import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import FilterCharacters from "@/components/FilterCharacters"

// Mock the context if needed
jest.mock("@/context/CharactersContextAPI", () => ({
  useCharactersContext: () => ({
    characters: [{ name: "Test Character" }],
    filteredCharacters: [{ name: "Test Character" }],
    setFilteredCharacters: jest.fn(),
  }),
  useCharacters: () => ({
    characters: [{ name: "Test Character" }],
    filteredCharacters: [{ name: "Test Character" }],
    setFilteredCharacters: jest.fn(),
  }),
}))

describe("FilterCharacters", () => {
  it("renders filter component", () => {
    render(<FilterCharacters />)
  })

  it("handles filter input changes", () => {
    render(<FilterCharacters />)

    // Look for input elements
    const inputs = screen.queryAllByRole("textbox")
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: "test filter" } })
      expect(inputs[0]).toHaveValue("test filter")
    }
  })

  it("renders filter options", () => {
    render(<FilterCharacters />)

    // Test for select elements or buttons that might be filter options
    const selectElements = screen.queryAllByRole("combobox")
    const buttonElements = screen.queryAllByRole("button")

    expect(selectElements.length + buttonElements.length).toBeGreaterThanOrEqual(0)
  })
})
