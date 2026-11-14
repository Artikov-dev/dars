import type { Order } from './Order.ts';
import { OrderDecorator } from './OrderDecorator.ts';

export class GiftWrapDecorator extends OrderDecorator {
    private giftWrapPrice: number;

    constructor(order: Order, giftWrapPrice: number = 20) {
        super(order);
        this.giftWrapPrice = giftWrapPrice;
    }

    getDescription(): string {
        return `${this.order.getDescription()} + Sovg'a qadoqlash`;
    }

    getPrice(): number {
        return this.order.getPrice() + this.giftWrapPrice;
    }
}
