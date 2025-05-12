"use server";

import { createPortfolioPrompt } from "@/constants/prompts";
import { SupabaseBuckets, SupabaseFunctions } from "@/constants/supabase";
import { uploadFile } from "./storage";
import { createClient } from "@/lib/supabase/server";

export async function createPortfolioFromResume(
    resume: string,
    user_id: string,
    resumeFile: File,
) {
    try {
        const { name, url } = await uploadFile(
            SupabaseBuckets.files,
            resumeFile,
            user_id,
            "resume",
        );

        const supabase = await createClient();

        const prompt = `${createPortfolioPrompt} ${resume}`;

        supabase.functions.invoke(SupabaseFunctions.ai_portfolio, {
            body: JSON.stringify({
                prompt,
                user_id,
                resume: { name, url },
            }),
        });

        return {
            status: "processing",
            message: "Portfolio generation queued.",
        };
    } catch (error) {
        console.error("error", error);
        return null;
    }
}
