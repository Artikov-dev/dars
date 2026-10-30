import type { NotificationService } from './NotificationService.ts';
import { EmailClient } from './EmailClient.ts';

export class EmailAdapter implements NotificationService {
    private client: EmailClient;
    private subject: string;
    constructor(client: EmailClient, subject = "Bildirishnoma") { this.client = client; this.subject = subject; }
    send(recipient: string, message: string) { this.client.sendEmail(recipient, this.subject, message); }
}
