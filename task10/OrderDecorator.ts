import type { Order } from './Order.ts';

export abstract class OrderDecorator implements Order {
    protected order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    getDescription(): string {
        return this.order.getDescription();
    }

    getPrice(): number {
        return this.order.getPrice();
    }
}
