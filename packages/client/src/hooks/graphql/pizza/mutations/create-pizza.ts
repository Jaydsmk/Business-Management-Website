import { gql } from '@apollo/client';

export const CREATE_PIZZA = gql`
  mutation ($input: CreatePizzaInput!) {
    createPizza(input: $input) {
      name
      description
      toppingIds
      imgSrc
    }
  }
`;
