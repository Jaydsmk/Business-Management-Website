import { CreateToppingInput, DeleteToppingInput, Topping, UpdateToppingInput } from '../schema/types/schema';
import { Root } from '../schema/types/types';
import { toppingProvider } from '../providers';
import { Pizza } from './pizza.resolver';

const toppingResolver = {
  Query: {
    toppings: async (): Promise<Topping[]> => {
      return toppingProvider.getToppings();
    },
  },

  Pizza: {
    toppings: async (parent: Pizza): Promise<Topping[]> => {
      // console.log(parent.toppingIds)

      return toppingProvider.getToppingsByIds(parent.toppingIds);
    },

    priceCents: async (parent: Pizza): Promise<Number> => {
      return toppingProvider.getPriceCents(parent.toppingIds);
    },
  },

  Mutation: {
    createTopping: async (_: Root, args: { input: CreateToppingInput }): Promise<Topping> => {
      return toppingProvider.createTopping(args.input);
    },

    deleteTopping: async (_: Root, args: { input: DeleteToppingInput }): Promise<string> => {
      return toppingProvider.deleteTopping(args.input.id);
    },

    updateTopping: async (_: Root, args: { input: UpdateToppingInput }): Promise<Topping> => {
      return toppingProvider.updateTopping(args.input);
    },
  },
};

export { toppingResolver };
