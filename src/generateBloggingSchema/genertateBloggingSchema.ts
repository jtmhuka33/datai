import OpenAI from "openai";
require("dotenv").config();

const openai = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY});

export async function generateBlogSchemaOpenAI() {
    const completion = await openai.chat.completions.create({
        messages: [{role: "system", content: "You are helpful coding assistant whose primary job is to code a typical postgresql schema for a typical blogging application accounting for all basic tables and their relations. Use markdown for formatting"}],
        model: "gpt-3.5-turbo",
    });
    const resolvedFirstChoice = await Promise.resolve(completion.choices[0]);
    return resolvedFirstChoice as unknown as string;
}
