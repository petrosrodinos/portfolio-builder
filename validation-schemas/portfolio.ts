import { z } from "zod";

export const ProfileSchema = z.object({
    vanity_url: z.string()
        .min(3, "Vanity URL is required")
        .max(20, "Vanity URL is too long")
        .regex(/^[a-zA-Z0-9-]+$/, "Vanity URL can only contain letters, numbers, and hyphens")
        .refine(val => val.trim() !== "", "Vanity URL cannot be empty"),
    email: z.string().email(),
    phone: z.string().min(10, "Phone number is required").max(18, "Phone number is too long").or(z.string().max(0)),
    address: z.string().min(3, "Address is required").max(50, "Address is to long").or(z.string().max(0)),
    welcome_message: z.string().min(10, "Message is required").max(300, "Message too long").or(z.string().max(0)),
    booking_link: z.string().url("Invalid link").or(z.string().max(0)),
});

export const BioSchema = z.object({
    role: z.string().min(2, "Role is required").max(50, "Role is too long"),
    bio: z.string().min(5, "Detailed bio must be at least 50 characters").max(2000, "Detailed bio is too long").or(z.string().max(0)),
    resume: z.any().optional(),
    years_of_experience: z.string().min(1, "Years of experience is required"),
});

export const ExperienceFormSchema = z.object({
    title: z.string().min(5, "Title is required").max(50, "Title is too long"),
    company: z.string().min(3, "Company is required").max(50, "Company is too long"),
    location: z.string().min(5, "Location is required").max(50, "Location is too long"),
    start: z.string().min(1, "Start date is required"),
    finish: z.string().optional(),
    description: z.string().min(10, "Description is required").max(2000, "Description is too long").or(z.string().max(0)),
    link: z.string().url("Invalid link").or(z.string().max(0)),
});

export const ProjectFormSchema = z.object({
    title: z.string().min(5, "Title is required").max(50, "Title is too long"),
    company: z.string().min(3, "Company is required").max(50, "Company is too long"),
    start: z.string().min(1, "Start date is required"),
    finish: z.string().optional(),
    description: z.string().min(10, "Description is required").max(2000, "Description is too long").or(z.string().max(0)),
    link: z.string().url("Invalid link").or(z.string().max(0)),
    image: z.any().optional(),
});

export const EducationFormSchema = z.object({
    title: z.string().min(5, "Title is required").max(50, "Title is too long"),
    institution: z.string().min(3, "Institution is required").max(50, "Institution is too long").or(z.string().max(0)),
    start: z.string().min(1, "Start date is required"),
    finish: z.string().optional(),
    description: z.string().min(10, "Description is required").max(2000, "Description is too long").or(z.string().max(0)),
    link: z.string().url("Invalid link").or(z.string().max(0)),
    degree_type: z.string().min(1, "Degree type is required"),
});

export const ServiceFormSchema = z.object({
    title: z.string().min(5, "Title is required").max(50, "Title is too long"),
    description: z.string().min(10, "Description is required").max(2000, "Description is too long"),
    price: z.string().optional(),
});

export const LinkFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    link: z.string().url("Invalid link"),
});

export const SkillFormSchema = z.object({
    title: z.string().min(1, "Skill is required"),
    level: z.string().min(1, "Level is required"),
});

export const LanguageFormSchema = z.object({
    title: z.string().min(1, "Language is required"),
    level: z.string().min(1, "Level is required"),
});




export type ProfileFormValues = z.infer<typeof ProfileSchema>;
export type BioFormValues = z.infer<typeof BioSchema>;
export type ExperienceFormValues = z.infer<typeof ExperienceFormSchema>;
export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;
export type EducationFormValues = z.infer<typeof EducationFormSchema>;
export type ServiceFormValues = z.infer<typeof ServiceFormSchema>;
export type LinkFormValues = z.infer<typeof LinkFormSchema>;
export type SkillFormValues = z.infer<typeof SkillFormSchema>;
export type LanguageFormValues = z.infer<typeof LanguageFormSchema>;
