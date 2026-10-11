import type { Drink } from './Drink.ts';
import type { DrinkFactory } from './DrinkFactory.ts';
import { Latte } from './Latte.ts';

export class LatteFactory implements DrinkFactory {
    public createDrink(): Drink {
        return new Latte();
    }
}
