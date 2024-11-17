import OpenAI from "openai";

export async function generateRestHelperFunctions(contentSchema: string, contentViews: string, context: string | null):Promise<string>{
    const openai = new OpenAI({ apiKey: process.env.API_KEY});
    const completion = await openai.chat.completions.create({
        messages:[
            {
                role: "system",
                content: "You are a helpful coding assistant with the primary purpose of creating postgreSQL rest helper stored functions"
            },
            {
                role: "user",
                content: `Generate postgreSQL rest helper stored functions based off of the the given schema, views and the provided context.
                 SQL Schema: 
                 ${contentSchema}

                 SQL Views:
                 ${contentViews}

                 Additional Context:
                 ${context}
                
                 Please only provide the SQL code. Comments are to be short and kept to a minimum
                `
            },
        ],
        model: "gpt-4o",
    });
    const resolvedFirstChoice = completion.choices[0].message.content;
    return resolvedFirstChoice as string;
}