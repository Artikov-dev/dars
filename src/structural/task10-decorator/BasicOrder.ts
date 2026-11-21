import type { Order } from './Order.ts';

export class BasicOrder implements Order {
    private description: string;
    private price: number;

    constructor(description: string = "Oddiy buyurtma", price: number = 100) {
        this.description = description;
        this.price = price;
    }

    getDescription(): string {
        return this.description;
    }

    getPrice(): number {
        return this.price;
    }
}
