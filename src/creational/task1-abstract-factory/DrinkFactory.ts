import type { Drink } from './Drink.ts';

export interface DrinkFactory {
    createDrink(): Drink;
}
