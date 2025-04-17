import { z } from "zod";
import { CountryCodes } from "@/constants/countries";


export const userSchema = z.object({
    full_name: z.string().min(2, "Full name is required"),
    country: z.enum(CountryCodes, {
        invalid_type_error: "Please select a valid country",
    }),
    date_of_birth: z.date().refine((date) => date < new Date(), {
        message: "Date of birth must be in the past",
    }),
    avatar: z.any().optional(),
});


export type ProfileFormValues = z.infer<typeof userSchema>;
