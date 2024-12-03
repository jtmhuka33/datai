import OpenAI from "openai";

export async function generateRestHelperFunctions(schemaContent: string, context: string | null, userFunctions: string | null):Promise<string>{
    const openai = new OpenAI({ apiKey: process.env.API_KEY});
    const completion = await openai.chat.completions.create({
        messages:[
            {
                role: "system",
                content: `
                    You are a helpful coding assistant with the primary purpose of creating 
                    (for any kind of data adhering to the provided schema) postgreSQL rest helper stored functions
                    using the provided generalised rest helper functions
                 `
            },
            {
                role: "user",
                content: `Generate postgreSQL rest helper stored functions based off of the the given schema and using the provided user specified stored functions.
                 Functions must have clearly defined data types for the their parameters with specified default values for optional parameters
                 Ensure correct SQL syntax
                 Ensure to use ALL the functions where necessary including the standardized function "rest_helper".
                 Ensure to title the table specific rest helper function by its CRUD operation name followed by the entity name (Ex.: patch_user)
                 Specify the use of the language postgreSQL
                 SQL Schema: 
                ${schemaContent}
                 Additional Context:
                ${context}
                User specified functions:
                ${userFunctions}
                
                Please only provide the SQL code. Include comments with detailed explainations
                `
            },
        ],
        model: "gpt-4o",
    });
    const resolvedFirstChoice = completion.choices[0].message.content;
    return resolvedFirstChoice as string;
}