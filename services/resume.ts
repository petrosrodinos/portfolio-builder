"use server";

import { createPortfolioPrompt } from "@/constants/prompts";
import axios from "axios";
import { Client } from "@upstash/qstash";
import { createClient } from "@/lib/supabase/client";
import { PUBLIC_SITE_URL } from "../constants";

export async function getPortfolioDataFromResume(resume: string) {
    try {
        // const supabase = createClient();

        // const { data, error } = await supabase.functions.invoke("ask-ai", {
        //     body: JSON.stringify({
        //         prompt: `${createPortfolioPrompt} ${resume}`,
        //     }),
        // });

        // if (error) {
        //     console.error("error", error);
        //     return null;
        // }

        // const payload = data?.content;

        // return payload;

        const client = new Client({
            token: process.env.PUBLIC_QSTASH_TOKEN!,
        });

        const prompt = `${createPortfolioPrompt} ${resume}`;

        await client.publish({
            url: `https://portfolio-builder-five.vercel.app/api/ask-ai`,
            body: JSON.stringify({ prompt }),
        });

        return {
            status: "processing",
            message: "Portfolio generation queued.",
        };

        // const response = await axios.post("/api/ask-ai", {
        //     prompt: `${createPortfolioPrompt} ${resume}`,
        // });

        // const data = response.data;

        // return data;
    } catch (error) {
        console.error("error", error);
        return null;
    }
}
