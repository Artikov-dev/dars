import { SupportHandler } from './SupportHandler.ts';
import type { Ticket } from './Ticket.ts';

export class Manager extends SupportHandler {
    protected canHandle(t: Ticket): boolean {
        return t.getLevel() === 3;
    }

    protected process(t: Ticket): void {
        console.log(`[Menejer] Tiket #${t.getId()} hal qilindi: ${t.getMessage()}`);
    }
}
