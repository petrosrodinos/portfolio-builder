import { fonts } from "@/config/fonts";
import { z } from "zod";


export const AccountAppearanceFormSchema = z.object({
    font: z.enum(fonts, {
        invalid_type_error: "Select a font",
        required_error: "Please select a font.",
    }),
    theme: z.any().optional(),
    color_scheme: z.enum(["light", "dark", "zinc-light", "zinc-dark", "stone-light", "stone-dark", "system"], {
        required_error: "Please select a color scheme.",
    }),
});

export type AccountAppearanceFormValues = z.infer<typeof AccountAppearanceFormSchema>;

