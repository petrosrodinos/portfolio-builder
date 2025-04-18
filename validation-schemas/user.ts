import { z } from "zod";


export const userSchema = z.object({
    full_name: z.string().min(2, "Full name is required"),
    country: z.string().min(1, "Country is required"),
    date_of_birth: z.date().refine((date) => date < new Date(), {
        message: "Date of birth must be in the past",
    }),
    avatar: z.any().optional(),
});


export type ProfileFormValues = z.infer<typeof userSchema>;
