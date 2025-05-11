"use server";
import OpenAI from "openai";
import { aiConfig } from "../constants";

export const askAI = async (prompt: string) => {
    const client = new OpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: aiConfig.deepSeek.baseURL,
    });

    const response = await client.chat.completions.create({
        model: aiConfig.deepSeek.model,
        messages: [{ role: "user", content: prompt }],
        stream: true,
        response_format: {
            type: "json_object",
        },
    });

    let fullMessage = "";

    for await (const chunk of response) {
        const content = chunk.choices?.[0]?.delta?.content;
        if (content) {
            fullMessage += content;
        }
    }

    return fullMessage;
};
