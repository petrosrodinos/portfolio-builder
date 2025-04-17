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

export const experienceFormSchema = z.object({
    title: z.string().min(5, "Title is required"),
    company: z.string().min(3, "Company is required"),
    location: z.string().min(5, "Location is required"),
    start: z.string().min(1, "Start date is required").optional(),
    finish: z.string().min(1, "Finish date is required").optional(),
    description: z.string().min(10, "Description is required"),
});

export const projectFormSchema = z.object({
    title: z.string().min(5, "Title is required"),
    company: z.string().min(3, "Company is required").optional(),
    start: z.string().min(1, "Start date is required").optional(),
    finish: z.string().min(1, "Finish date is required").optional(),
    description: z.string().min(10, "Description is required"),
    link: z.string().url("Invalid link").optional(),
    image: z.any().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type BioFormValues = z.infer<typeof bioSchema>;
export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;
export type ProjectFormValues = z.infer<typeof projectFormSchema>;
