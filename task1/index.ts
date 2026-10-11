export interface Drink {
    name(): string;
}

export class Latte implements Drink {
    public name(): string {
        return "Латте";
    }
}

export class Tea implements Drink {
    public name(): string {
        return "Чай";
    }
}

export class Cappuccino implements Drink {
    public name(): string {
        return "Капучино";
    }
}

export interface DrinkFactory {
    createDrink(): Drink;
}

export class LatteFactory implements DrinkFactory {
    public createDrink(): Drink {
        return new Latte();
    }
}

export class TeaFactory implements DrinkFactory {
    public createDrink(): Drink {
        return new Tea();
    }
}

export class CappuccinoFactory implements DrinkFactory {
    public createDrink(): Drink {
        return new Cappuccino();
    }
}

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
        throw new Error("Ichimlik turi ko'rsatilmadi!");
    }

    const key = kind.trim().toLowerCase();
    const FactoryClass = cafeRegistry.get(key);

    if (!FactoryClass) {
        const available = Array.from(cafeRegistry.keys()).join(", ");
        throw new Error(`Noma'lum ichimlik: "${kind}". Mavjud: [${available}]`);
    }

    return new FlexibleCafe(new FactoryClass());
}

function main(): void {
    console.log("==================================================");
    console.log("      TASK 1: FACTORY METHOD PATTERN (TS)");
    console.log("==================================================");

    console.log("\n[1] GoF Factory Method orqali:");
    const coffeeCafe = new CoffeeCafe();
    coffeeCafe.order();

    const teaCafe = new TeaCafe();
    teaCafe.order();

    console.log("\n[2] Registry Pattern orqali (if-else siz dinamik yaratish):");
    const kinds = ["coffee", "tea", "cappuccino"];
    for (const kind of kinds) {
        const cafe = createCafeByKind(kind);
        cafe.order();
    }

    console.log("\n[3] Xatolikni tekshirish:");
    try {
        createCafeByKind("cola").order();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(`Kutilgan xatolik: ${e.message}`);
        }
    }

    console.log("\n==================================================");
}

main();
