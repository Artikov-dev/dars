import type { NotificationService } from './NotificationService.ts';
import { SmsNotificationService } from './SmsNotificationService.ts';
import { TelegramClient } from './TelegramClient.ts';
import { EmailClient } from './EmailClient.ts';
import { TelegramAdapter } from './TelegramAdapter.ts';
import { EmailAdapter } from './EmailAdapter.ts';
import { NotificationManager } from './NotificationManager.ts';

export class Main {
    static main() {
        const message = "Buyurtmangiz qabul qilindi";
        const targets: [NotificationService, string][] = [
            [new SmsNotificationService(), "+998901234567"],
            [new TelegramAdapter(new TelegramClient()), "123456789"],
            [new EmailAdapter(new EmailClient()), "user@example.com"],
        ];

        const manager = new NotificationManager(targets[0][0]);
        for (const [service, recipient] of targets) {
            manager.setService(service);
            manager.notify(recipient, message);
        }
    }
}

Main.main();
