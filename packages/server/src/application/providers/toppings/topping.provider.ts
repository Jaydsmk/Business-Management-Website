import { ObjectId, Collection } from 'mongodb';
import { ToppingDocument, toToppingObject } from '../../../entities/topping';
import { CreateToppingInput, Topping, UpdateToppingInput } from './topping.provider.types';
import validateStringInputs from '../../../lib/string-validator';

class ToppingProvider {
  constructor(private collection: Collection<ToppingDocument>) {}

  public async getToppings(): Promise<Topping[]> {
    const toppings = await this.collection.find().sort({ name: 1 }).toArray();
    return toppings.map(toToppingObject);
  }

  public async getToppingsByIds(toppingIds: string[]): Promise<Topping[]> {
    const topping = await this.collection
      .find({ _id: { $in: toppingIds } })
      .sort({ name: 1 })
      .toArray();

    // console.log(topping)

    return topping.map(toToppingObject);
  }

  public async getPriceCents(toppingIds: string[]): Promise<Number> {
    const basePrice = Number(process.env.BASE_PRICE_CENTS);
    const eachToppings = await this.getToppingsByIds(toppingIds);
    const toppingsPriceTotal =
      basePrice + eachToppings.map((eachTopping) => eachTopping.priceCents).reduce((acc, curr) => acc + curr, 0);

    return toppingsPriceTotal;
  }

  public async validateToppings(toppingIds: string[]): Promise<void> {
    const existToppings = toppingIds.map((id) => new ObjectId(id));
    const topping = await this.collection
      .find({ _id: { $in: existToppings } })
      .sort({ name: 1 })
      .toArray();
    if (toppingIds.length !== topping.length) {
      throw new Error(`Could not validate the ${topping} topping`);
    }
  }

  public async createTopping(input: CreateToppingInput): Promise<Topping> {
    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      { $set: { ...input, updatedAt: new Date().toISOString(), createdAt: new Date().toISOString() } },
      { upsert: true, returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not create the ${input.name} topping`);
    }
    const topping = data.value;

    return toToppingObject(topping);
  }

  public async deleteTopping(id: string): Promise<string> {
    const toppingId = new ObjectId(id);

    const toppingData = await this.collection.findOneAndDelete({
      _id: toppingId,
    });

    const topping = toppingData.value;

    if (!topping) {
      throw new Error(`Could not delete the topping`);
    }

    return id;
  }

  public async updateTopping(input: UpdateToppingInput): Promise<Topping> {
    const { id, name, priceCents } = input;

    if (name) validateStringInputs(name);

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...(name && { name: name }), ...(priceCents && { priceCents: priceCents }) } },
      { returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not update the topping`);
    }
    const topping = data.value;

    return toToppingObject(topping);
  }
}

export { ToppingProvider };
