import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import NavigationBar from "@/components/NavigationBar"

// Mock for the context
const mockUseCharactersContext = {
  characters: [],
  favouriteCharacters: [],
  deletedCharacters: [],
  filteredCharacters: [],
  setFilteredCharacters: jest.fn(),
  addToFavourites: jest.fn(),
  removeFromFavourites: jest.fn(),
  softDeleteCharacter: jest.fn(),
  restoreCharacter: jest.fn(),
}
// Mock ContextAPI
jest.mock("@/context/CharactersContextAPI", () => ({
  useCharactersContext: () => mockUseCharactersContext,
  useCharacters: () => mockUseCharactersContext,
}))

// Mock Next.js Link component
jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
  MockLink.displayName = "NextLink"
  return MockLink
})

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useSearchParams: () => ({
    get: (key: string) => null,
    toString: () => "",
    has: () => false,
  }),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

// NavigationBar tests
describe("NavigationBar", () => {
  it("renders without crashing", async () => {
    const NavigationBar = (await import("@/components/NavigationBar")).default
    const { container } = render(<NavigationBar />)
    expect(container).toBeInTheDocument()
  })

  it("contains navigation elements", () => {
    render(<NavigationBar />)
    const navElement =
      document.querySelector("nav") || screen.getByRole("navigation", { hidden: true })
    expect(navElement).toBeInTheDocument()
  })
})
