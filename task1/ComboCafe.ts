import type { Drink } from './Drink.ts';
import type { Dessert } from './Dessert.ts';
import type { CafeFactory } from './CafeFactory.ts';

export class ComboCafe {
    private readonly factory: CafeFactory;

    constructor(factory: CafeFactory) {
        this.factory = factory;
    }

    public orderCombo(): { drink: Drink; dessert: Dessert } {
        const drink = this.factory.createDrink();
        const dessert = this.factory.createDessert();
        console.log(`Готовим и выдаём комбо: ${drink.name()} + ${dessert.name()}`);
        return { drink, dessert };
    }
}
