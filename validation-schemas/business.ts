import { z } from "zod";

export const BankInfoSchema = z.object({
    account_holder_name: z.string().min(2, "Account holder name must be at least 2 characters"),
    account_number: z.string().min(8, "Account number must be at least 8 digits"),
    bank_name: z.string().min(2, "Bank name must be at least 2 characters"),
    swift: z.string().min(2, "Swift must be at least 2 characters"),
});

export type BankInfoFormValues = z.infer<typeof BankInfoSchema>;
