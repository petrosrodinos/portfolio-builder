import { z } from "zod";

export const ProfileSchema = z.object({
    vanity_url: z.string().min(3, "Vanity URL is required"),
    email: z.string().email(),
    phone: z.string().min(10, "Phone number is required").max(15, "Phone number is too long").optional(),
    address: z.string().min(5, "Address is required").optional(),
    welcome_message: z.string().max(200, "Message too long").optional(),
});

export const BioSchema = z.object({
    role: z.string().min(2, "Role is required"),
    bio: z.string().min(5, "Detailed bio must be at least 50 characters").max(2000, "Detailed bio is too long"),
    resume: z.any().optional(),
});

export const ExperienceFormSchema = z.object({
    title: z.string().min(5, "Title is required"),
    company: z.string().min(3, "Company is required"),
    location: z.string().min(5, "Location is required"),
    start: z.string().min(1, "Start date is required").optional(),
    finish: z.string().min(1, "Finish date is required").optional(),
    description: z.string().min(10, "Description is required"),
});

export const ProjectFormSchema = z.object({
    title: z.string().min(5, "Title is required"),
    company: z.string().min(3, "Company is required").optional(),
    start: z.string().min(1, "Start date is required").optional(),
    finish: z.string().min(1, "Finish date is required").optional(),
    description: z.string().min(10, "Description is required"),
    link: z.string().url("Invalid link").optional(),
    image: z.any().optional(),
});

export const EducationFormSchema = z.object({
    title: z.string().min(5, "Title is required"),
    institution: z.string().min(3, "Institution is required").optional(),
    start: z.string().min(1, "Start date is required").optional(),
    finish: z.string().min(1, "Finish date is required").optional(),
    description: z.string().min(10, "Description is required").optional(),
});

export const ServiceFormSchema = z.object({
    title: z.string().min(5, "Title is required"),
    description: z.string().min(10, "Description is required"),
    price: z.string().optional(),
});

export const LlinkFormSchema = z.object({
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
export type LinkFormValues = z.infer<typeof LlinkFormSchema>;
export type SkillFormValues = z.infer<typeof SkillFormSchema>;
export type LanguageFormValues = z.infer<typeof LanguageFormSchema>;
