import { z } from "zod";

export const userSchema = z.object({
    full_name: z.string().min(2, "Full name is required"),
    address: z.string().min(5, "Address is required").optional(),
    date_of_birth: z.date().refine((date) => date < new Date(), {
        message: "Date of birth must be in the past",
    }),
});