import { z } from "zod";

export const signinSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Please enter your email" })
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(1, {
            message: "Please enter your password",
        })
        .min(6, {
            message: "Password must be at least 6 characters long",
        }),
});

export const signupSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: "Please enter your email" })
            .email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(1, {
                message: "Please enter your password",
            })
            .min(6, {
                message: "Password must be at least 6 characters long",
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match.",
        path: ["confirmPassword"],
    });