import { Collection } from 'mongodb';

import { reveal, stub } from 'jest-auto-stub';
import { PizzaProvider } from '../../src/application/providers/pizzas/pizza.provider';
import { ToppingProvider } from '../../src/application/providers/toppings/topping.provider';
import { mockSortSkipLimitToArray, mockSortToArray, mockToArray } from '../helpers/mongo.helper';
import { createMockPizzaDocument } from '../helpers/pizza.helper';
import { createMockToppingDocument } from '../helpers/topping.helper';
import { PizzaDocument, toPizzaObject } from '../../src/entities/pizza';
import { CursorProvider } from '../../src/application/providers/cursor/cursor.provider';

const stubPizzaCollection = stub<Collection<PizzaDocument>>();
const stubToppingProvider = stub<ToppingProvider>();
const cursorProvider = new CursorProvider(stubPizzaCollection);
const pizzaProvider = new PizzaProvider(stubPizzaCollection, stubToppingProvider, cursorProvider);

beforeEach(jest.clearAllMocks);

describe('pizzaProvider', (): void => {
  const mockPizzaDocument = createMockPizzaDocument();
  const mockPizza = toPizzaObject(mockPizzaDocument);
  const mockTopping = createMockToppingDocument();

  describe('getPizzas', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection)
        .find.mockImplementationOnce(mockSortToArray([mockPizzaDocument]))
        .mockImplementationOnce(mockToArray([mockPizzaDocument]))
        .mockImplementationOnce(mockSortSkipLimitToArray([mockPizzaDocument]));
    });
    test('should call find once', () => {
      pizzaProvider.getPizzas({ cursor: '', limit: 1 });

      expect(stubPizzaCollection.find).toHaveBeenCalledTimes(1);
    });

    test('should get all pizzas', async () => {
      const result = await pizzaProvider.getPizzas({ cursor: '', limit: 1 });
      const expectCursorResult = {
        results: [mockPizza],
        totalCount: 1,
        hasNextPage: false,
        cursor: '',
      };

      expect(result).toEqual(expectCursorResult);
    });
  });

  describe('createPizza', (): void => {
    const validPizza = createMockPizzaDocument();

    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
    });
    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.createPizza({
        name: validPizza.name,
        description: validPizza.description,
        imgSrc: validPizza.imgSrc,
        toppingIds: [],
      });

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a pizza when passed valid input', async () => {
      const result = await pizzaProvider.createPizza({
        name: validPizza.name,
        description: validPizza.description,
        imgSrc: validPizza.imgSrc,
        toppingIds: validPizza.toppingIds,
      });

      expect(result).toEqual(toPizzaObject(validPizza));
    });
  });

  describe('deletePizza', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: mockPizzaDocument }));
    });
    test('should call findOneAndDelete once', async () => {
      await pizzaProvider.deletePizza(mockPizzaDocument.id);

      expect(stubPizzaCollection.findOneAndDelete).toHaveBeenCalledTimes(1);
    });

    test('should throw an error if findOneAndDelete returns null for value', async () => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: null }));

      await expect(pizzaProvider.deletePizza(mockPizzaDocument.id)).rejects.toThrow(
        new Error('Could not delete the pizza')
      );
    });

    test('should return an id', async () => {
      const result = await pizzaProvider.deletePizza(mockPizzaDocument.id);

      expect(result).toEqual(mockPizzaDocument.id);
    });
  });

  describe('updatePizza', (): void => {
    const validPizza = createMockPizzaDocument();
    // const validPizza = createMockPizzaDocument({ name: 'test topping', priceCents: 12345 });

    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
    });

    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.updatePizza({
        id: validPizza.id,
        name: validPizza.name,
        description: validPizza.description,
        toppingIds: [mockTopping.id],
        imgSrc: validPizza.imgSrc,
      });

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a pizza', async () => {
      const result = await pizzaProvider.updatePizza({
        id: validPizza.id,
        name: validPizza.name,
        description: validPizza.description,
        toppingIds: [mockTopping.id],
        imgSrc: validPizza.imgSrc,
      });

      expect(result).toEqual(toPizzaObject(validPizza));
    });
  });
});
