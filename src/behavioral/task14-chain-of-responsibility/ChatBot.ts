import { SupportHandler } from './SupportHandler.ts';
import type { Ticket } from './Ticket.ts';

export class ChatBot extends SupportHandler {
    protected canHandle(t: Ticket): boolean {
        return t.getLevel() === 1;
    }

    protected process(t: Ticket): void {
        console.log(`[Bot] Tiket #${t.getId()} hal qilindi: ${t.getMessage()}`);
    }
}
