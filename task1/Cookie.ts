import type { Dessert } from './Dessert.ts';

export class Cookie implements Dessert {
    public name(): string {
        return "Печенье";
    }
}
