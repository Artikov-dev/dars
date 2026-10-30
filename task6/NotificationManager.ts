import type { NotificationService } from './NotificationService.ts';

export class NotificationManager {
    private service: NotificationService;
    constructor(service: NotificationService) { this.service = service; }
    setService(service: NotificationService) { this.service = service; }
    notify(recipient: string, message: string) { this.service.send(recipient, message); }
}
