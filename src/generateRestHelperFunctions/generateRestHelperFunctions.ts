import OpenAI from "openai";

export async function generateRestHelperFunctions(contentSchema: string, context: string | null):Promise<string>{
    const openai = new OpenAI({ apiKey: process.env.API_KEY});
    const completion = await openai.chat.completions.create({
        messages:[
            {
                role: "system",
                content: `
                    You are a helpful coding assistant with the primary purpose of creating generalized
                    (for any kind of data adhering to the provided schema) postgreSQL rest helper stored functions
                    to be used in future table / model specific rest stored functions.
                 `
            },
            {
                role: "user",
                content: `Generate postgreSQL rest helper stored functions based off of the the given schema.
                 Keep in mind the functions should validate input data (Ex.: text inputs conform to specific formats)
                 Keep in mind the functions should extract and process attributes from JSONB objects and provide default values when necessary
                 Keep in mind the functions should generate standardized JSONB responses which include status codes and messages.
                 Keep in mind the functions should handles exceptions correctly.
                 Functions must have clearly defined data types for the their parameters (TEXT, INTEGER etc.) with specified default values for optional parameters
                 Define structure for JSONB responses
                 Specify the use of the language postgresQL
                 SQL Schema: 
                 ${contentSchema}

                 Additional Context:
                 ${context}
                
                 Please only provide the SQL code. Include comments with detailed explainations
                `
            },
        ],
        model: "gpt-4o",
    });
    const resolvedFirstChoice = completion.choices[0].message.content;
    return resolvedFirstChoice as string;
}