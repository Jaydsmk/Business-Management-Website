import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    toppings: [Topping!]!
    name: String!
    id: ObjectID!
    description: String!
    imgSrc: String!
    priceCents: Int!
  }

  type Query {
    pizzas: [Pizza!]!
  }
`;

export { typeDefs };
