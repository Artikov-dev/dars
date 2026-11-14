import type { Order } from './Order.ts';
import { OrderDecorator } from './OrderDecorator.ts';

export class ExpressDeliveryDecorator extends OrderDecorator {
    private deliveryPrice: number;

    constructor(order: Order, deliveryPrice: number = 30) {
        super(order);
        this.deliveryPrice = deliveryPrice;
    }

    getDescription(): string {
        return `${this.order.getDescription()} + Tezkor yetkazib berish`;
    }

    getPrice(): number {
        return this.order.getPrice() + this.deliveryPrice;
    }
}
