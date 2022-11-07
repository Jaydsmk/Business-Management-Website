import { ObjectId } from 'mongodb';
import { gql } from 'apollo-server-core';
import { TestClient } from '../helpers/client.helper';
import { createMockTopping } from '../helpers/topping.helper';
import { createMockPizza } from '../helpers/pizza.helper';
import { typeDefs } from '../../src/application/schema';
import { resolvers } from '../../src/application/resolvers/index';
import { pizzaProvider, toppingProvider } from '../../src/application/providers';
import {
  MutationCreatePizzaArgs,
  MutationDeletePizzaArgs,
  MutationUpdatePizzaArgs,
} from '../../src/application/schema/types/schema';

let client: TestClient;

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

const mockTopping = createMockTopping();
const mockPizza = createMockPizza();

beforeAll(async (): Promise<void> => {
  client = new TestClient(typeDefs, resolvers);
});

beforeEach(async (): Promise<void> => {
  jest.restoreAllMocks();
});

describe('pizzaResolver', (): void => {
  describe('Query', () => {
    describe('pizzas', () => {
      const query = gql`
        query getPizzas {
          pizzas {
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
        }
      `;
      test('should get all pizzas', async () => {
        jest.spyOn(pizzaProvider, 'getPizzas').mockResolvedValue([mockPizza]);
        jest.spyOn(toppingProvider, 'getToppingsByIds').mockResolvedValue([mockTopping]);
        jest.spyOn(toppingProvider, 'getPriceCents').mockResolvedValue(mockTopping.priceCents);

        const result = await client.query({ query });

        expect(result.data).toEqual({
          pizzas: [
            {
              __typename: 'Pizza',
              id: mockPizza.id,
              name: mockPizza.name,
              description: mockPizza.description,
              toppings: await toppingProvider.getToppingsByIds(mockPizza.toppingIds),
              priceCents: await toppingProvider.getPriceCents(mockPizza.toppingIds),
              imgSrc: mockPizza.imgSrc,
            },
          ],
        });
        expect(pizzaProvider.getPizzas).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Mutation', () => {
    describe('createPizza', () => {
      const mutation = gql`
        mutation ($input: CreatePizzaInput!) {
          createPizza(input: $input) {
            name
            description
            toppingIds
            imgSrc
          }
        }
      `;

      const validPizza = createMockPizza({
        name: 'TestPizza',
        description: 'To test creating a pizza',
        toppingIds: [
          new ObjectId('e9e565e9a57cf33fb9b8ceed'),
          new ObjectId('a1a854cf98dbeed3b525d8a9'),
          new ObjectId('a10d50e732a0b1d4f2c5e506'),
        ],
        imgSrc: 'test.jpg',
      });

      const variables: MutationCreatePizzaArgs = {
        input: {
          name: validPizza.name,
          description: validPizza.description,
          toppingIds: validPizza.toppingIds,
          imgSrc: validPizza.imgSrc,
        },
      };

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'createPizza').mockResolvedValue(validPizza);
      });

      test('should call create pizza when passed a valid input', async () => {
        await client.mutate({ mutation, variables });

        expect(pizzaProvider.createPizza).toHaveBeenCalledWith(variables.input);
      });

      test('should return created pizza when passed a valid input', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          createPizza: {
            __typename: 'Pizza',
            name: validPizza.name,
            description: validPizza.description,
            toppingIds: validPizza.toppingIds,
            imgSrc: validPizza.imgSrc,
          },
        });
      });
    });

    describe('deletePizza', () => {
      const mutation = gql`
        mutation ($input: DeletePizzaInput!) {
          deletePizza(input: $input)
        }
      `;

      const variables: MutationDeletePizzaArgs = { input: { id: mockPizza.id } };

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'deletePizza').mockResolvedValue(mockPizza.id);
      });

      test('should call deletePizza with id', async () => {
        await client.mutate({ mutation, variables });

        expect(pizzaProvider.deletePizza).toHaveBeenCalledWith(variables.input.id);
      });

      test('should return deleted pizza id', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          deletePizza: mockPizza.id,
        });
      });
    });

    describe('updatePizza', () => {
      const mutation = gql`
        mutation ($input: UpdatePizzaInput!) {
          updatePizza(input: $input) {
            id
            name
            description
            toppingIds
            imgSrc
          }
        }
      `;
      const updatedPizza = createMockPizza({
        name: 'updated pizza',
        description: 'updated description',
        toppingIds: [new ObjectId('baaa18844b8db958c57edddf')],
        imgSrc: 'updatedImgSrc.jpg',
      });

      const variables: MutationUpdatePizzaArgs = {
        input: {
          id: mockPizza.id,
          name: updatedPizza.name,
          description: updatedPizza.description,
          toppingIds: updatedPizza.toppingIds,
          imgSrc: updatedPizza.imgSrc,
        },
      };

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'updatePizza').mockResolvedValue(updatedPizza);
      });

      test('should call updatePizza with input', async () => {
        await client.mutate({ mutation, variables });

        expect(pizzaProvider.updatePizza).toHaveBeenCalledWith(variables.input);
      });

      const { id, name, description, toppingIds, imgSrc } = updatedPizza;

      test('should return updated pizza', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          updatePizza: {
            __typename: 'Pizza',
            id,
            name,
            description,
            toppingIds,
            imgSrc,
          },
        });
      });
    });
  });
});
