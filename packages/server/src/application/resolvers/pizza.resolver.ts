// import { Schema } from 'inspector';
import { pizzaProvider } from '../providers';
import { Pizza as PizzaSchema } from '../schema/types/schema';

export type Pizza = Omit<PizzaSchema, 'toppings'> & { toppingIds: string[] };

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<Pizza[]> => {
      return pizzaProvider.getPizzas();
    },
  },
};

export { pizzaResolver };
