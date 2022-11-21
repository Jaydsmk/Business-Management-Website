import { gql } from '@apollo/client';

const GET_PIZZAS = gql`
  query Pizzas($input: QueryInput!) {
    pizzas(input: $input) {
      results {
        id
        name
        description
        toppings {
          name
          priceCents
          id
        }
        imgSrc
        priceCents
      }
      totalCount
      hasNextPage
      cursor
    }
  }
`;

export { GET_PIZZAS };
