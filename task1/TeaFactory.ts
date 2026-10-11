import type { Drink } from './Drink.ts';
import type { DrinkFactory } from './DrinkFactory.ts';
import { Tea } from './Tea.ts';

export class TeaFactory implements DrinkFactory {
    public createDrink(): Drink {
        return new Tea();
    }
}
