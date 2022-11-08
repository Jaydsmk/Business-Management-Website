import { ObjectId } from 'bson';
import { Pizza } from '../../src/application/schema/types/schema';
import { PizzaDocument } from '../../src/entities/pizza';

const createMockPizza = (data?: Partial<Pizza>): Pizza => {
  return {
    __typename: 'Pizza',
    id: new ObjectId().toHexString(),
    name: 'TestPizza',
    description: 'To test creating a pizza',
    imgSrc: 'test.jpg',
    toppings: [],
    toppingIds: [
      new ObjectId('e9e565e9a57cf33fb9b8ceed'),
      new ObjectId('a1a854cf98dbeed3b525d8a9'),
      new ObjectId('a10d50e732a0b1d4f2c5e506'),
    ],
    priceCents: 750,
    ...data,
  };
};

const createMockPizzaDocument = (data?: Partial<PizzaDocument>): PizzaDocument => {
  return {
    _id: new ObjectId(),
    name: 'TestPizza',
    description: 'To test creating a pizza',
    imgSrc: 'test.jpg',
    toppingsIds: [
      new ObjectId('e9e565e9a57cf33fb9b8ceed'),
      new ObjectId('a1a854cf98dbeed3b525d8a9'),
      new ObjectId('a10d50e732a0b1d4f2c5e506'),
    ],
    ...data,
  };
};

export { createMockPizza, createMockPizzaDocument };
