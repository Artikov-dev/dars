import type { NotificationService } from './NotificationService.ts';

export class SmsNotificationService implements NotificationService {
    send(recipient: string, message: string) {
        console.log(`[SMS] ${recipient} raqamiga: ${message}`);
    }
}
