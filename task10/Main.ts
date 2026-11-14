import type { Order } from './Order.ts';
import { BasicOrder } from './BasicOrder.ts';
import { GiftWrapDecorator } from './GiftWrapDecorator.ts';
import { ExpressDeliveryDecorator } from './ExpressDeliveryDecorator.ts';

export class Main {
    static main() {
        const order1: Order = new BasicOrder("Smartfon", 500);
        console.log(`1. Oddiy buyurtma:`);
        console.log(`Tavsif: ${order1.getDescription()}`);
        console.log(`Narx: $${order1.getPrice()}\n`);

        const order2: Order = new GiftWrapDecorator(order1);
        console.log(`2. Sovg'a qadoqlash qo'shilgan buyurtma:`);
        console.log(`Tavsif: ${order2.getDescription()}`);
        console.log(`Narx: $${order2.getPrice()}\n`);

        const order3: Order = new ExpressDeliveryDecorator(order1);
        console.log(`3. Tezkor yetkazib berish qo'shilgan buyurtma:`);
        console.log(`Tavsif: ${order3.getDescription()}`);
        console.log(`Narx: $${order3.getPrice()}\n`);

        const order4: Order = new ExpressDeliveryDecorator(new GiftWrapDecorator(order1));
        console.log(`4. Sovg'a qadoqlash va tezkor yetkazib berish qo'shilgan buyurtma:`);
        console.log(`Tavsif: ${order4.getDescription()}`);
        console.log(`Narx: $${order4.getPrice()}`);
    }
}

Main.main();
