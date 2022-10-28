import { ObjectId } from 'mongodb';

export interface Pizza {
  id: ObjectId;
  name: string;
  description: string;
  toppingIds: [string];
  // toppings: [string];
  imgSrc: string;
}
