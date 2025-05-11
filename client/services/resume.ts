// "use server";

import { createPortfolioPrompt } from "@/constants/prompts";
import { Client } from "@upstash/qstash";
import { SUPABASE_AI_FUNCTION } from "../constants";
import { SupabaseBuckets } from "@/constants/supabase";
import { uploadFile } from "./storage";

export async function getPortfolioDataFromResume(
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

        const client = new Client({
            token: process.env.NEXT_PUBLIC_QSTASH_TOKEN!,
        });

        const prompt = `${createPortfolioPrompt} ${resume}`;

        await client.publish({
            url: SUPABASE_AI_FUNCTION,
            body: JSON.stringify({ prompt, user_id, resume: { name, url } }),
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
