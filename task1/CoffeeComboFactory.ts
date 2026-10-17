import type { Drink } from './Drink.ts';
import type { Dessert } from './Dessert.ts';
import type { CafeFactory } from './CafeFactory.ts';
import { Latte } from './Latte.ts';
import { Cake } from './Cake.ts';

export class CoffeeComboFactory implements CafeFactory {
    public createDrink(): Drink {
        return new Latte();
    }

    public createDessert(): Dessert {
        return new Cake();
    }
}
