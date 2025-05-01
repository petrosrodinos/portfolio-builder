import { fonts } from "@/config/fonts";
import { z } from "zod";


export const AccountAppearanceFormSchema = z.object({
    font: z.enum(fonts, {
        invalid_type_error: "Select a font",
        required_error: "Please select a font.",
    }),
    theme: z.any().optional(),
    color_scheme: z.any().optional(),

});

export const PortfolioAppearanceFormSchema = z.object({
    font: z.enum(fonts, {
        invalid_type_error: "Select a font",
        required_error: "Please select a font.",
    }),
});

export type AccountAppearanceFormValues = z.infer<typeof AccountAppearanceFormSchema>;
export type PortfolioAppearanceFormValues = z.infer<typeof PortfolioAppearanceFormSchema>;

