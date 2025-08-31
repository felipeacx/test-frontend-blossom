"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">500 - Server Error</h1>
            <p className="text-lg mb-4">Something went wrong on our end.</p>
            <button
              onClick={() => reset()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
