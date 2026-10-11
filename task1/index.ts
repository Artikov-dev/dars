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

function main(): void {
    console.log("==================================================");
    console.log("      TASK 1: FACTORY METHOD PATTERN (TS)");
    console.log("==================================================");

    console.log("\n[1] GoF Factory Method orqali:");
    new CoffeeCafe().order();
    new TeaCafe().order();

    console.log("\n[2] Asl Cafe(kind) orqali (if-else siz, Registry bilan):");
    const kinds = ["coffee", "tea", "cappuccino"];
    for (const kind of kinds) {
        new Cafe(kind).order();
    }

    console.log("\n[3] Bir qatorli tezkor Cafe.order(kind):");
    Cafe.order("coffee");

    console.log("\n[4] Xatolikni tekshirish:");
    try {
        new Cafe("cola").order();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(`Kutilgan xatolik: ${e.message}`);
        }
    }

    console.log("\n==================================================");
}

main();
