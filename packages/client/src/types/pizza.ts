import { Topping } from './schema';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  toppingIds: string;
  toppings: [Topping];
  imgSrc: string;
}
