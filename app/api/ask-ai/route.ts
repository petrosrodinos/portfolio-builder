import { aiConfig } from "@/constants/index";
import OpenAI from "openai";

export async function POST(req: Request) {
    const body = await req.json();
    const { prompt } = body;

    const client = new OpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: aiConfig.deepSeek.baseURL,
    });

    const response = await client.chat.completions.create({
        model: aiConfig.deepSeek.model,
        messages: [{ role: "user", content: prompt }],
        response_format: {
            type: "json_object",
        },
    });

    const content = response?.choices?.[0]?.message?.content || null;

    const jsonResponse = content?.replace(/```(?:json)?\n?|```/g, "");

    const payload = JSON.parse(jsonResponse);

    return new Response(JSON.stringify({ content: payload }));
}
