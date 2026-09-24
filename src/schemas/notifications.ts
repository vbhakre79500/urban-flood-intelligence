import { z } from "zod";

export const notificationChannelSchema = z.enum(["IN_APP", "EMAIL", "SMS", "PUSH"]);
export type NotificationChannel = z.infer<typeof notificationChannelSchema>;

export const notificationStatusSchema = z.enum(["PENDING", "SENT", "DELIVERED", "READ", "FAILED"]);
export type NotificationStatus = z.infer<typeof notificationStatusSchema>;

export const notificationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  alertId: z.string().uuid().nullable().optional(),
  channel: notificationChannelSchema,
  status: notificationStatusSchema,
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
  sentAt: z.date().nullable().optional(),
  readAt: z.date().nullable().optional(),
  createdAt: z.date(),
});

export type Notification = z.infer<typeof notificationSchema>;
