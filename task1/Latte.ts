import type { Drink } from './Drink.ts';

export class Latte implements Drink {
    public name(): string {
        return "Латте";
    }
}
