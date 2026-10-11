import { CoffeeCafe, TeaCafe, createCafeByKind } from './Cafe.ts';

function printHeader(title: string): void {
    console.log("\n" + "=".repeat(55));
    console.log(`   ${title}`);
    console.log("=".repeat(55));
}

function main(): void {
    printHeader("1. KLASSIK FACTORY METHOD PATTERN (GoF)");
    console.log("Har bir Cafe vorisi o'zining ichimligini yaratadi:\n");

    const coffeeCafe = new CoffeeCafe();
    coffeeCafe.order();

    const teaCafe = new TeaCafe();
    teaCafe.order();

    printHeader("2. PARAMETRIZATSIYALANGAN REGISTRY FACTORY");
    console.log("String 'kind' bo'yicha if-else siz, O(1) xarita orqali chaqirish:\n");

    const orders = ["coffee", "tea", "cappuccino"];

    for (const kind of orders) {
        console.log(`[Buyurtma]: "${kind}" so'ralmoqda...`);
        const cafe = createCafeByKind(kind);
        cafe.order();
    }

    printHeader("3. XATOLIKNI TEKSHIRISH (Noto'g'ri tur)");
    const unknownKind = "juice";
    try {
        console.log(`[Buyurtma]: "${unknownKind}" so'ralmoqda...`);
        const cafe = createCafeByKind(unknownKind);
        cafe.order();
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(`Xatolik ushlandi: ${err.message}`);
        }
    }

    console.log("\n" + "=".repeat(55));
    console.log("   Muvaffaqiyatli yakunlandi!");
    console.log("=".repeat(55) + "\n");
}

main();
