import type { Metadata } from "next"
import "./globals.css"
import NavigationBar from "@/components/NavigationBar"
import { CharactersProvider } from "@/context/CharactersContextAPI"
import localFont from "next/font/local"

export const metadata: Metadata = {
  title: "Blossom: Test Frontend Developer",
  description: "Test Frontend Developer Next.js app",
}

const greycliff = localFont({
  src: [
    { path: "../../public/fonts/Greycliff-CF-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Greycliff-CF-Bold.otf", weight: "700", style: "normal" },
  ],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${greycliff.className} bg-white grid grid-cols-3`}>
        <CharactersProvider>
          <NavigationBar />
          {children}
        </CharactersProvider>
      </body>
    </html>
  )
}
