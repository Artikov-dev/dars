import type { Dessert } from './Dessert.ts';

export class Cake implements Dessert {
    public name(): string {
        return "Торт";
    }
}
