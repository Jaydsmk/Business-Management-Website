import { Collection } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';
import { Pizza } from './pizza.provider.types';

class PizzaProvider {
  constructor(private Collection: Collection<PizzaDocument>) {}

  public async getPizzas(): Promise<Pizza[]> {
    const pizzas = await this.Collection.find().sort({ name: 1 }).toArray();
    return pizzas.map(toPizzaObject);
  }
}

export { PizzaProvider };
