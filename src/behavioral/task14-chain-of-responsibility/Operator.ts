import { SupportHandler } from './SupportHandler.ts';
import type { Ticket } from './Ticket.ts';

export class Operator extends SupportHandler {
    protected canHandle(t: Ticket): boolean {
        return t.getLevel() === 2;
    }

    protected process(t: Ticket): void {
        console.log(`[Operator] Tiket #${t.getId()} hal qilindi: ${t.getMessage()}`);
    }
}
