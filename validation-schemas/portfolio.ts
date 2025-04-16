import { z } from "zod";


export const profileSchema = z.object({
    email: z.string().email(),
    phone: z.string().min(10, "Phone number is required").max(15, "Phone number is too long").optional(),
    address: z.string().min(5, "Address is required").optional(),
    welcome_message: z.string().max(200, "Message too long").optional(),
    // urls: z.array(z.object({ value: z.string().url().optional() })),
});

export const bioSchema = z.object({
    role: z.string().min(2, "Role is required"),
    bio: z.string().min(50, "Detailed bio must be at least 50 characters").max(2000, "Detailed bio is too long"),
    resume: z.any().optional(),
});