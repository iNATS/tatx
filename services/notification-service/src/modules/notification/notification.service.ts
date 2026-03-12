import { Injectable } from '@nestjs/common';
import { prisma } from '@tatx/database';

@Injectable()
export class NotificationService {
  async create(data: {
    userId: string; type: string; title: string; message: string;
    data?: Record<string, unknown>;
  }) {
    return prisma.notification.create({
      data: { ...data, status: 'PENDING' },
    });
  }

  async findByUserId(userId: string, unreadOnly?: boolean) {
    return prisma.notification.findMany({
      where: {
        userId,
        ...(unreadOnly && { status: { not: 'READ' } }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(notificationId: string) {
    return prisma.notification.update({
      where: { id: notificationId },
      data: { status: 'READ', readAt: new Date() },
    });
  }

  async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, status: { not: 'READ' } },
      data: { status: 'READ', readAt: new Date() },
    });
  }

  async delete(notificationId: string) {
    return prisma.notification.delete({ where: { id: notificationId } });
  }

  async sendEmail(to: string, subject: string, body: string) {
    // TODO: Integrate with email provider (SendGrid, SES, etc.)
    console.log(`Sending email to ${to}: ${subject}`);
    return { sent: true, to, subject };
  }

  async sendSms(to: string, body: string) {
    // TODO: Integrate with SMS provider (Twilio, etc.)
    console.log(`Sending SMS to ${to}: ${body}`);
    return { sent: true, to, body };
  }

  async sendPush(userId: string, title: string, body: string, data?: Record<string, unknown>) {
    // TODO: Integrate with FCM/APNS
    const notification = await this.create({ userId, type: 'PUSH', title, message: body, data });
    console.log(`Sending push notification to user ${userId}: ${title}`);
    return notification;
  }
}
