import type { NotificationService } from './NotificationService.ts';
import { TelegramClient } from './TelegramClient.ts';

export class TelegramAdapter implements NotificationService {
    private client: TelegramClient;
    constructor(client: TelegramClient) { this.client = client; }
    send(recipient: string, message: string) { this.client.sendTelegramMessage(recipient, message); }
}
