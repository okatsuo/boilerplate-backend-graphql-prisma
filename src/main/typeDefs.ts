export const typeDefs = `#graphql
type Account {
  id: ID!
  username: String!
  email: String!
  createdAt: Float!
  updatedAt: Float!
}

type SignIn {
  accessToken: String!
  account: Account!
}

type Query {
  profile: Account!
  signIn(email: String!, password: String!): SignIn!
}

type Mutation {
  signUp(username: String!, email: String!, password: String!): Account!
}
`
