import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    toppings: [Topping!]!
    name: String!
    id: ObjectID!
    description: String!
    imgSrc: String!
  }

  type Query {
    pizzas: [Pizza!]!
  }
`;

export { typeDefs };
