"use server"
import OpenAI from "openai";

export const askAI = async (prompt: string) => {

    const client = new OpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: 'https://api.deepseek.com/v1',
    });

    const response = await client.chat.completions.create({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        // response_format: {
        //     type: 'json_object',
        // },
    });

    return response.choices[0].message.content
}

