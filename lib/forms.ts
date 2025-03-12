import { z } from "zod";

// Auth
const emailSchema = z.string().email("Please enter a valid email");
const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long");

export const SignupFormSchema = z
    .object({
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const LoginFormSchema = z.object({
    email: emailSchema,
    password: z.string(),
});

export const ForgotPasswordFormSchema = z.object({
    email: emailSchema,
});

export type TForgotPasswordFormSchema = z.infer<
    typeof ForgotPasswordFormSchema
>;

export const ResetPasswordFormSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type TSignupFormSchema = z.infer<typeof SignupFormSchema>;
export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;
export type TResetPasswordFormSchema = z.infer<typeof ResetPasswordFormSchema>;

// Todos
export const TodoCreateFormSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be less than 100 characters"),
    description: z
        .string()
        .max(300, "Description must be less than 300 characters")
        .nullish(),
});

export const TodoUpdateFormSchema = z.object({
    id: z.string().uuid("Invalid todo ID format"),
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be less than 100 characters"),
    description: z
        .string()
        .max(300, "Description must be less than 300 characters")
        .nullish(),
    completed: z.boolean().optional(),
});

export const TodoDeleteFormSchema = z.object({
    id: z.string().uuid("Invalid todo ID format"),
});

export const TodoToggleFormSchema = z.object({
    id: z.string().uuid("Invalid todo ID format"),
    completed: z.boolean(),
});
export type TTodoCreateFormSchema = z.infer<typeof TodoCreateFormSchema>;
export type TTodoUpdateFormSchema = z.infer<typeof TodoUpdateFormSchema>;
export type TTodoDeleteFormSchema = z.infer<typeof TodoDeleteFormSchema>;
export type TTodoToggleFormSchema = z.infer<typeof TodoToggleFormSchema>;
