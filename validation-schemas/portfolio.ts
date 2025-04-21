import { z } from "zod";

export const ProfileSchema = z.object({
    // TODO: Add regex for vanity url not special characters and spaces
    vanity_url: z.string().min(3, "Vanity URL is too short").max(20, "Vanity URL is too long"),
    email: z.string().email(),
    phone: z.string().min(10, "Phone number is required").max(15, "Phone number is too long").or(z.string().max(0)),
    address: z.string().min(3, "Address is too short").max(50, "Address is to long").or(z.string().max(0)),
    welcome_message: z.string().min(10, "Message is too short").max(300, "Message too long").or(z.string().max(0)),
});

export const BioSchema = z.object({
    role: z.string().min(2, "Role is too short").max(50, "Role is too long"),
    bio: z.string().min(5, "Detailed bio must be at least 50 characters").max(2000, "Detailed bio is too long").or(z.string().max(0)),
    resume: z.any().optional(),
});

export const ExperienceFormSchema = z.object({
    title: z.string().min(5, "Title is too short").max(50, "Title is too long"),
    company: z.string().min(3, "Company is required").max(50, "Company is too long"),
    location: z.string().min(5, "Location is required").max(50, "Location is too long"),
    start: z.string().min(1, "Start date is required"),
    finish: z.string().optional(),
    description: z.string().min(10, "Description is required").max(2000, "Description is too long").or(z.string().max(0)),
    link: z.string().url("Invalid link").or(z.string().max(0)),
});

export const ProjectFormSchema = z.object({
    title: z.string().min(5, "Title is too short").max(50, "Title is too long"),
    company: z.string().min(3, "Company is required").max(50, "Company is too long"),
    start: z.string().min(1, "Start date is required"),
    finish: z.string().optional(),
    description: z.string().min(10, "Description is required").max(2000, "Description is too long").or(z.string().max(0)),
    link: z.string().url("Invalid link").or(z.string().max(0)),
    image: z.any().optional(),
});

export const EducationFormSchema = z.object({
    title: z.string().min(5, "Title is too short").max(50, "Title is too long"),
    institution: z.string().min(3, "Institution is required").max(50, "Institution is too long").or(z.string().max(0)),
    start: z.string().min(1, "Start date is required"),
    finish: z.string().optional(),
    description: z.string().min(10, "Description is required").max(2000, "Description is too long").or(z.string().max(0)),
    link: z.string().url("Invalid link").or(z.string().max(0)),
});

export const ServiceFormSchema = z.object({
    title: z.string().min(5, "Title is too short").max(50, "Title is too long"),
    description: z.string().min(10, "Description is required").max(2000, "Description is too long"),
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
