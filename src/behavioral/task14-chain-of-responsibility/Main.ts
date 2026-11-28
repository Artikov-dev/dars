import { Ticket } from './Ticket.ts';
import { ChatBot } from './ChatBot.ts';
import { Operator } from './Operator.ts';
import { Manager } from './Manager.ts';

export class Main {
    static main() {
        const chain = new ChatBot();
        chain.setNext(new Operator()).setNext(new Manager());

        const tickets = [
            new Ticket(1, "Parolni qanday o'zgartiraman?", 1),
            new Ticket(2, "To'lov o'tmadi", 2),
            new Ticket(3, "Pulni qaytarish", 3),
            new Ticket(4, "Ma'lumotlar sizib chiqdi", 4),
        ];

        for (const ticket of tickets) {
            chain.handle(ticket);
        }
    }
}

Main.main();
