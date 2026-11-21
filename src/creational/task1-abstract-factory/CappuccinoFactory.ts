import type { Drink } from './Drink.ts';
import type { DrinkFactory } from './DrinkFactory.ts';
import { Cappuccino } from './Cappuccino.ts';

export class CappuccinoFactory implements DrinkFactory {
    public createDrink(): Drink {
        return new Cappuccino();
    }
}
