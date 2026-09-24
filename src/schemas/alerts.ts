import { z } from "zod";

export const alertSeveritySchema = z.enum(["ADVISORY", "WATCH", "WARNING", "EMERGENCY"]);
export type AlertSeverity = z.infer<typeof alertSeveritySchema>;

export const alertStatusSchema = z.enum(["DRAFT", "ACTIVE", "ACKNOWLEDGED", "RESOLVED", "EXPIRED"]);
export type AlertStatus = z.infer<typeof alertStatusSchema>;

export const alertSchema = z.object({
  id: z.string().uuid(),
  zoneId: z.string().uuid(),
  severity: alertSeveritySchema,
  title: z.string().min(5).max(180),
  description: z.string().min(10).max(2000),
  actionGuidelines: z.array(z.string()).default([]),
  status: alertStatusSchema,
  issuedBy: z.string().uuid(),
  issuedAt: z.date(),
  expiresAt: z.date(),
  resolvedAt: z.date().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Alert = z.infer<typeof alertSchema>;

export const createAlertInputSchema = z.object({
  zoneId: z.string().uuid({ message: "Valid Zone ID is required" }),
  severity: alertSeveritySchema,
  title: z.string().min(5).max(180),
  description: z.string().min(10).max(2000),
  actionGuidelines: z.array(z.string()).min(1, { message: "At least one action guideline is required" }),
  expiresInHours: z.number().int().positive().max(72).default(12),
});

export type CreateAlertInput = z.infer<typeof createAlertInputSchema>;

export const updateAlertStatusSchema = z.object({
  status: alertStatusSchema,
  resolutionNote: z.string().optional(),
});
export type UpdateAlertStatusInput = z.infer<typeof updateAlertStatusSchema>;
