import { ObjectId } from 'bson';
import { Pizza } from '../../../types/schema';

export const createTestPizza = (data: Partial<Pizza> = {}): Pizza & { __typename: string } => ({
  __typename: 'Pizza',
  id: new ObjectId().toHexString(),
  name: 'TestPizza',
  description: 'To test creating a pizza',
  imgSrc: 'testPizza.jpg',
  toppings: [],
  toppingIds: [
    new ObjectId('e9e565e9a57cf33fb9b8ceed'),
    new ObjectId('a1a854cf98dbeed3b525d8a9'),
    new ObjectId('a10d50e732a0b1d4f2c5e506'),
  ],
  priceCents: 750,
  ...data,
});
