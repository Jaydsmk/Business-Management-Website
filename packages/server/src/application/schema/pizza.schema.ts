import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    toppings: [Topping!]!
    toppingIds: [ObjectID!]!
    imgSrc: String!
    priceCents: Int!
  }

  type Query {
    pizzas(input: QueryInput!): GetPizzasResponse!
  }

  type Mutation {
    createPizza(input: CreatePizzaInput!): Pizza!
    updatePizza(input: UpdatePizzaInput!): Pizza!
    deletePizza(input: DeletePizzaInput!): ObjectID!
  }

  input CreatePizzaInput {
    name: String!
    description: String!
    toppingIds: [ObjectID!]!
    imgSrc: String!
  }

  input UpdatePizzaInput {
    id: ObjectID!
    name: String
    description: String
    toppingIds: [ObjectID!]
    imgSrc: String
  }

  input DeletePizzaInput {
    id: ObjectID!
  }
`;

export { typeDefs };
