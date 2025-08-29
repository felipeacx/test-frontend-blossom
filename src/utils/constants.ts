import { gql } from "graphql-request"

export const ENDPOINT = "https://rickandmortyapi.com/graphql"

export const charactersQuery = gql`
  query {
    characters(page: 1) {
      results {
        id
        name
        image
        species
        status
        gender
      }
    }
  }
`
