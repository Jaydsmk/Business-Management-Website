import { gql } from 'apollo-server';

const typeDefs = gql`
  input QueryInput {
    limit: Int
    cursor: String
  }

  type GetPizzasResponse {
    results: [Pizza!]!
    totalCount: Int!
    hasNextPage: Boolean!
    cursor: String!
  }
`;
export { typeDefs };
