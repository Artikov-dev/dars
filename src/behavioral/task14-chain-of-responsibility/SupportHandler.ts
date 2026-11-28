import type { Ticket } from './Ticket.ts';

export abstract class SupportHandler {
    protected next: SupportHandler | null = null;

    setNext(next: SupportHandler): SupportHandler {
        this.next = next;
        return next;
    }

    handle(t: Ticket): void {
        if (this.canHandle(t)) {
            this.process(t);
            return;
        }

        if (this.next) {
            this.next.handle(t);
        } else {
            console.log(`Tiket #${t.getId()} hal qilinmadi!`);
        }
    }

    protected abstract canHandle(t: Ticket): boolean;

    protected abstract process(t: Ticket): void;
}
