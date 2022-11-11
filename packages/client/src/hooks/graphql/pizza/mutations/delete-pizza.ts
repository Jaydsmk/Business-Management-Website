import { gql } from '@apollo/client';

export const DELETE_PIZZA = gql`
  mutation ($input: DeletePizzaInput!) {
    deletePizza(input: $input)
  }
`;
