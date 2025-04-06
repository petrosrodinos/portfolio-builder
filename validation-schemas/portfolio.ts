import { z } from "zod";


export const profileSchema = z.object({
    email: z.string().email(),
    fullname: z.string().min(2, "Full name is required"),
    avatar: z.instanceof(FileList).refine((file) => file?.length == 1, 'File is required.').optional(),
    address: z.string().min(5, "Address is required").optional(),
    welcomeMessage: z.string().max(200, "Message too long").optional(),
    urls: z.array(z.object({ value: z.string().url().optional() })),
});