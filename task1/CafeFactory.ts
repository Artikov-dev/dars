import type { Drink } from './Drink.ts';
import type { Dessert } from './Dessert.ts';

export interface CafeFactory {
    createDrink(): Drink;
    createDessert(): Dessert;
}
