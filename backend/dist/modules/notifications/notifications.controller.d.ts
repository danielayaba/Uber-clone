import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    sendNotification(body: {
        userId: string;
        title: string;
        text: string;
    }): Promise<{
        success: boolean;
    }>;
}
