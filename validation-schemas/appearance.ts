import { fonts } from "@/config/fonts";
import { z } from "zod";


export const accountAppearanceFormSchema = z.object({
    font: z.enum(fonts, {
        invalid_type_error: "Select a font",
        required_error: "Please select a font.",
    }),
    theme: z.any().optional(),
    color_scheme: z.any().optional(),
});

export type AccountAppearanceFormValues = z.infer<typeof accountAppearanceFormSchema>;

