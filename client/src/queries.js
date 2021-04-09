import { gql } from 'apollo-boost' // for EXAMPLE 1, 2

// Posts Queries
export const GET_POSTS = gql`
  query {
    getPosts {
      _id
      title
      description
      imageUrl
      categories
      createdDate
      likes
      createdBy {
        _id
        username
        email
        joinDate
        password
      }
    }
  }
`
// User Queries


// Posts Mutations


// User Mutations

