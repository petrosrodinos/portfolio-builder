import { z } from "zod";


export const UserSchema = z.object({
    full_name: z.string().min(2, "Full name is required"),
    country: z.string().min(1, "Country is required"),
    date_of_birth: z.string().min(1, "Date of birth is required"),
    avatar: z.any().optional(),
    profession: z.string().min(1, "Profession is required"),
});


export type ProfileFormValues = z.infer<typeof UserSchema>;
