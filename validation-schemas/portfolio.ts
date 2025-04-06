import { z } from "zod";


export const profileSchema = z.object({
    email: z.string().email(),
    fullname: z.string().min(2, "Full name is required"),
    avatar: z.instanceof(File).refine((file) => file, 'File is required.').optional(),
    address: z.string().min(5, "Address is required").optional(),
    welcomeMessage: z.string().max(200, "Message too long").optional(),
    urls: z.array(z.object({ value: z.string().url().optional() })),
});

export const bioSchema = z.object({
    role: z.string().min(2, "Role is required"),
    shortBio: z.string().min(10, "Detailed bio is required"),
    bio: z.string().min(50, "Detailed bio must be at least 50 characters"),
    resume: z
        .instanceof(File)
        .refine((file) => file, "Resume is required")
        .optional(),
});