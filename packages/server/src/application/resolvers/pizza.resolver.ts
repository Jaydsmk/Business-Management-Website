import { pizzaProvider } from '../providers';
import {
  DeletePizzaInput,
  UpdatePizzaInput,
  CreatePizzaInput,
  Pizza as PizzaSchema,
  GetPizzasResponse as PizzaResSchema,
  QueryInput,
} from '../schema/types/schema';
import { Root } from '../schema/types/types';

export type Pizza = Omit<PizzaSchema, 'toppings' | 'priceCents'> & { toppingIds: string[] };
export type GetPizzasResponse = Omit<PizzaResSchema, 'results'> & { results: Pizza[] };

const pizzaResolver = {
  Query: {
    pizzas: async (_: Root, args: { input: QueryInput }): Promise<GetPizzasResponse> => {
      return pizzaProvider.getPizzas(args.input);
    },
  },

  Mutation: {
    createPizza: async (_: Root, args: { input: CreatePizzaInput }): Promise<Pizza> => {
      return pizzaProvider.createPizza(args.input);
    },

    updatePizza: async (_: Root, args: { input: UpdatePizzaInput }): Promise<Pizza> => {
      return pizzaProvider.updatePizza(args.input);
    },

    deletePizza: async (_: Root, args: { input: DeletePizzaInput }): Promise<string> => {
      return pizzaProvider.deletePizza(args.input.id);
    },
  },
};

export { pizzaResolver };
