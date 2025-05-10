"use server";

import { createPortfolioPrompt } from "@/constants/prompts";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function createPortfolioFromResume(resume: string) {
    try {
        const { data, error } = await supabase.functions.invoke("ask-ai", {
            body: JSON.stringify({
                prompt: `${createPortfolioPrompt} ${resume}`,
            }),
        });

        if (error) {
            console.error(error);
            return null;
        }

        const jsonResponse = data?.content?.replace(
            /```(?:json)?\n?|```/g,
            "",
        );

        const payload = JSON.parse(jsonResponse);

        return payload;
    } catch (error) {
        console.error("error", error);
        return null;
    }
}
