import type { Drink } from './Drink.ts';
import type { DrinkFactory } from './DrinkFactory.ts';
import { Latte } from './Latte.ts';
import { Tea } from './Tea.ts';
import { LatteFactory } from './LatteFactory.ts';
import { TeaFactory } from './TeaFactory.ts';
import { CappuccinoFactory } from './CappuccinoFactory.ts';

export abstract class Cafe {
    public abstract createDrink(): Drink;

    public order(): void {
        const drink = this.createDrink();
        console.log(`Готовим и выдаём: ${drink.name()}`);
    }
}

export class CoffeeCafe extends Cafe {
    public createDrink(): Drink {
        return new Latte();
    }
}

export class TeaCafe extends Cafe {
    public createDrink(): Drink {
        return new Tea();
    }
}

export class FlexibleCafe {
    private readonly factory: DrinkFactory;

    constructor(factory: DrinkFactory) {
        this.factory = factory;
    }

    public order(): void {
        const drink = this.factory.createDrink();
        console.log(`Готовим и выдаём: ${drink.name()}`);
    }
}

type FactoryConstructor = new () => DrinkFactory;

const cafeRegistry = new Map<string, FactoryConstructor>([
    ["coffee", LatteFactory],
    ["latte", LatteFactory],
    ["tea", TeaFactory],
    ["cappuccino", CappuccinoFactory]
]);

export function createCafeByKind(kind: string): FlexibleCafe {
    if (!kind || kind.trim() === "") {
        throw new Error("Ichimlik turi bo'sh bo'lishi mumkin emas!");
    }

    const key = kind.trim().toLowerCase();
    const FactoryClass = cafeRegistry.get(key);

    if (!FactoryClass) {
        const availableKinds = Array.from(cafeRegistry.keys()).join(", ");
        throw new Error(`Noma'lum ichimlik: "${kind}". Mavjud turlar: [${availableKinds}]`);
    }

    return new FlexibleCafe(new FactoryClass());
}
