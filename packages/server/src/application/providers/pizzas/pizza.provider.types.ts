import { ObjectId } from 'mongodb';

export interface Pizza {
  id: ObjectId;
  name: string;
  description: string;
  toppingIds: string[];
  // toppings: [string];
  imgSrc: string;
}

export interface CreatePizzaInput {
  name: string;
  description: string;
  toppingIds: string[];
  imgSrc: string;
}

export interface UpdatePizzaInput {
  id: string;
  name?: string | null;
  description?: string | null;
  toppingIds?: string[] | null;
  imgSrc?: string | null;
}
