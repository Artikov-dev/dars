import type { Drink } from './Drink.ts';

export class Tea implements Drink {
    public name(): string {
        return "Чай";
    }
}
