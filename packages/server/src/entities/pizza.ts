import { Document } from 'mongodb';
import { Pizza } from '../application/providers/pizzas/pizza.provider.types';

export interface PizzaDocument extends Document, Omit<PizzaData, 'toppingIds' | 'id'> {}

export interface PizzaData {
  id: string;
  name: string;
  description: string;
  toppingIds: string[];
  imgSrc: string;
}

const toPizzaObject = (pizza: PizzaDocument): Pizza => {
  return {
    id: pizza._id.toHexString(),
    name: pizza.name,
    description: pizza.description,
    toppingIds: pizza.toppingIds,
    imgSrc: pizza.imgSrc,
  };
};

export { toPizzaObject };
