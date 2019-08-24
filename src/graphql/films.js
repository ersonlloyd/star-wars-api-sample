import gql from 'graphql-tag'

const ALL_FILMS = gql`
  query allFilms {
    getAllFilms
    @rest(
      type: "Films",
      path: "films/",
      method: "GET",
      endpoint: ""
    ) {
      results
    }
  }
`

export default {
  ALL_FILMS
}
  