import type { Drink } from './Drink.ts';

export class Cappuccino implements Drink {
    public name(): string {
        return "Капучино";
    }
}
