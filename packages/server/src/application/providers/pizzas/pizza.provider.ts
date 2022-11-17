import { Collection, ObjectId } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';
import { Pizza } from './pizza.provider.types';
import { CreatePizzaInput, UpdatePizzaInput } from 'src/application/schema/types/schema';
import validateStringInputs from '../../../lib/string-validator';
import { ToppingProvider } from '../toppings/topping.provider';
import { CursorProvider } from '../cursor/cursor.provider';
import { QueryInput } from '../cursor/cursor.provider.types';
import { GetPizzasResponse } from '../../resolvers/pizza.resolver';

class PizzaProvider {
  constructor(
    private collection: Collection<PizzaDocument>,
    private toppingProvider: ToppingProvider,
    private cursorProvider: CursorProvider
  ) {}

  public async getPizzas({ cursor, limit }: QueryInput): Promise<GetPizzasResponse> {
    const cursorGetPizza = await this.cursorProvider.getCursorResult({ cursor, limit });

    return cursorGetPizza;
  }

  public async createPizza(input: CreatePizzaInput): Promise<Pizza> {
    const { name, description, imgSrc } = input;
    const allInput: string[] = [name, description, imgSrc];
    if (allInput) validateStringInputs(allInput);

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      {
        $set: {
          ...input,
          toppingIds: input.toppingIds?.map((toppingId) => new ObjectId(toppingId)),
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
      },
      { upsert: true, returnDocument: 'after' }
    );
    // console.log(data)

    if (!data.value) {
      throw new Error(`Could not create ${input.name} pizza`);
    }
    // console.log(data.value)

    const pizza = data.value;

    return toPizzaObject(pizza);
  }

  public async updatePizza(input: UpdatePizzaInput): Promise<Pizza> {
    const { id, name, description, toppingIds, imgSrc } = input;

    if (name) validateStringInputs(name);
    if (description) validateStringInputs(description);
    if (imgSrc) validateStringInputs(imgSrc);

    if (toppingIds) this.toppingProvider.validateToppings(toppingIds);

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(name && { name: name }),
          ...(description && { description: description }),
          ...(toppingIds && { toppingIds: toppingIds.map((topping) => new ObjectId(topping)) }),
          ...(imgSrc && { imgSrc: imgSrc }),
        },
      },
      { returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not update the pizza`);
    }
    const pizza = data.value;

    return toPizzaObject(pizza);
  }

  public async deletePizza(id: string): Promise<string> {
    const pizzaID = new ObjectId(id);

    const data = await this.collection.findOneAndDelete({
      _id: pizzaID,
    });

    const pizza = data.value;

    if (!pizza) {
      throw new Error(`Could not delete the pizza`);
    }

    return id;
  }
}

export { PizzaProvider };
