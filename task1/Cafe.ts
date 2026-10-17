import type { Drink } from './Drink.ts';
import type { DrinkFactory } from './DrinkFactory.ts';
import { LatteFactory } from './LatteFactory.ts';
import { TeaFactory } from './TeaFactory.ts';
import { CappuccinoFactory } from './CappuccinoFactory.ts';

export class Cafe {
    private static readonly registry = new Map<string, DrinkFactory>([
        ["coffee", new LatteFactory()],
        ["latte", new LatteFactory()],
        ["tea", new TeaFactory()],
        ["cappuccino", new CappuccinoFactory()]
    ]);

    protected readonly factory: DrinkFactory;

    constructor(kindOrFactory: string | DrinkFactory) {
        if (typeof kindOrFactory === "string") {
            if (!kindOrFactory || kindOrFactory.trim() === "") {
                throw new Error("Ichimlik turi ko'rsatilmadi!");
            }
            const key = kindOrFactory.trim().toLowerCase();
            const found = Cafe.registry.get(key);
            if (!found) {
                const available = Array.from(Cafe.registry.keys()).join(", ");
                throw new Error(`Noma'lum ichimlik: "${kindOrFactory}". Mavjud: [${available}]`);
            }
            this.factory = found;
        } else {
            this.factory = kindOrFactory;
        }
    }

    public static register(kind: string, factory: DrinkFactory): void {
        Cafe.registry.set(kind.trim().toLowerCase(), factory);
    }

    public static order(kind: string): Drink {
        return new Cafe(kind).order();
    }

    public createDrink(): Drink {
        return this.factory.createDrink();
    }

    public order(): Drink {
        const drink = this.createDrink();
        console.log(`Готовим и выдаём: ${drink.name()}`);
        return drink;
    }
}

export class CoffeeCafe extends Cafe {
    constructor() {
        super(new LatteFactory());
    }
}

export class TeaCafe extends Cafe {
    constructor() {
        super(new TeaFactory());
    }
}

export function createCafeByKind(kind: string): Cafe {
    return new Cafe(kind);
}

export { ComboCafe } from './ComboCafe.ts';
export type { CafeFactory } from './CafeFactory.ts';
export { CoffeeComboFactory } from './CoffeeComboFactory.ts';
export { TeaComboFactory } from './TeaComboFactory.ts';

