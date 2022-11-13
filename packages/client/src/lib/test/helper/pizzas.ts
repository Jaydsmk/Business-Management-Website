import { ObjectId } from 'bson';
import { Pizza } from '../../../types/schema';
import { createTestTopping } from './topping';

export const createTestPizza = (data: Partial<Pizza> = {}): Pizza & { __typename: string } => ({
  __typename: 'Pizza',
  id: new ObjectId().toHexString(),
  name: 'TestPizza',
  description: 'To test creating a pizza',
  imgSrc: 'testPizza.jpg',
  toppings: [createTestTopping({ name: 'kimchi' }), createTestTopping({ name: 'bulgogi' })],
  toppingIds: [],
  priceCents: 350,
  ...data,
});
