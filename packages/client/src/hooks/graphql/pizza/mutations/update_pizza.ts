import { gql } from '@apollo/client';

export const UPDATE_PIZZA = gql`
  mutation ($input: UpdatePizzaInput!) {
    updatePizza(input: $input) {
      id
      name
      description
      toppings {
        id
        name
        priceCents
      }
      imgSrc
      priceCents
    }
  }
`;
