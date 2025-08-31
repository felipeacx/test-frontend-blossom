# test-frontend-blossom

Next.js Frontend for managing and viewing characters.

## Requirements

- Node.js (16+ recommended)
- npm
- API that provides character data. The app expects an API base URL available at `https://rickandmortyapi.com/documentation/`.

## Setup

Open a terminal (cmd.exe) in the project root (`x:\Dev\NextJS\test-frontend-blossom`) and run:

```cmd
npm install
```

```cmd
npm run dev
```

Open `http://localhost:3000/` at browser

## Build & Start (production)

```cmd
npm run build
```

```cmd
npm start
```

## Tests

```cmd
npm test
```

## API

Common endpoints

The aplicattion use this endpoints:

GET /characters
Description: list characters

GET /characters/:id
Description: get single character detail

Example character object:

```json
{
  "id": "123",
  "name": "Rick Sanchez"
}
```

Functionality

When application loads, characters are retrieved and displayed in NavigationBar

When character is selected, the character is loaded by id and details are displayed

The favorite, comments and soft-delete is managed by CharactersContextAPI
