import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must contain at least 8 characters."),
  remember: z.boolean().default(false),
});

export const registerSchema = loginSchema.extend({
  fullName: z.string().trim().min(2, "Full name must contain at least 2 characters."),
  terms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms to continue." }) }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

export const createAuthFormSchema = (mode: "login" | "register" | "forgot") => z.object({
  fullName: z.string(),
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string(),
  remember: z.boolean(),
  terms: z.boolean(),
}).superRefine((values, context) => {
  if (mode === "register" && values.fullName.trim().length < 2) context.addIssue({ code: "custom", path: ["fullName"], message: "Full name must contain at least 2 characters." });
  if (mode !== "forgot" && values.password.length < 8) context.addIssue({ code: "custom", path: ["password"], message: "Password must contain at least 8 characters." });
  if (mode === "register" && !values.terms) context.addIssue({ code: "custom", path: ["terms"], message: "You must accept the terms to continue." });
});

export const moduleRecordSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters.").max(80, "Name is too long."),
  type: z.string().trim().min(2, "Type must contain at least 2 characters.").max(50, "Type is too long."),
  status: z.string().min(1, "Choose a status."),
  description: z.string().trim().max(240, "Description must be 240 characters or fewer.").optional(),
});

export const settingsSchema = z.object({
  workspaceName: z.string().trim().min(2, "Workspace name must contain at least 2 characters."),
  supportEmail: z.string().trim().email("Enter a valid support email."),
  timezone: z.string().min(1, "Choose a timezone."),
  language: z.string().min(1, "Choose a language."),
  emailSummaries: z.boolean(),
  securityAlerts: z.boolean(),
  productUpdates: z.boolean(),
});

export const profileSchema = z.object({
  firstName: z.string().trim().min(2, "First name must contain at least 2 characters."),
  lastName: z.string().trim().min(2, "Last name must contain at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().regex(/^\+?[0-9 ()-]{7,20}$/, "Enter a valid phone number."),
  bio: z.string().trim().max(250, "Bio must be 250 characters or fewer."),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type AuthFormValues = z.infer<ReturnType<typeof createAuthFormSchema>>;
export type ModuleRecordValues = z.infer<typeof moduleRecordSchema>;
export type SettingsValues = z.infer<typeof settingsSchema>;
export type ProfileValues = z.infer<typeof profileSchema>;
