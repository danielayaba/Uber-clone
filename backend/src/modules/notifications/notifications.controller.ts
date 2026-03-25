import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send')
  sendNotification(@Body() body: { userId: string; title: string; text: string }) {
    return this.notificationsService.sendPushNotification(body.userId, body.title, body.text);
  }
}
