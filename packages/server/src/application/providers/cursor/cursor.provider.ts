import { Collection } from 'mongodb';
import { GetPizzasResponse } from '../../resolvers/pizza.resolver';
import { QueryInput } from '../../schema/types/schema';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';

class CursorProvider {
  constructor(private collection: Collection<PizzaDocument>) {}

  public async getCursorIndex(cursor: string | null | undefined): Promise<number> {
    const pizzas = await this.collection.find().sort({ _id: 1 }).toArray();
    const cursorIdx = cursor ? pizzas.findIndex((pizza) => pizza._id.toString() === cursor) + 1 : 0;

    return cursorIdx;
  }

  public async getCursorResult({ limit, cursor }: QueryInput): Promise<GetPizzasResponse> {
    const cursorIdx = await this.getCursorIndex(cursor);

    const totalPizzaNum = await this.collection.find().toArray();
    limit = limit ? limit : 0;
    const hasNextPage = totalPizzaNum.length > cursorIdx + limit;

    const results = await this.collection.find().sort({ name: 1 }).skip(cursorIdx).limit(limit).toArray();
    const returnCursor = hasNextPage ? results[results.length - 1]._id.toString() : '';

    return {
      hasNextPage,
      cursor: returnCursor,
      totalCount: results.length,
      results: results.map(toPizzaObject),
    };
  }
}

export { CursorProvider };
