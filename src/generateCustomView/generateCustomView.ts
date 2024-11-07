import OpenAI from "openai";

export async function generateCustomView(content: string, context: string | null): Promise<string> {
    const openai = new OpenAI({ apiKey: process.env.API_KEY});
    const completion = await openai.chat.completions.create({
       messages:[
        {
            role: "system",
            content: "You are a helpful coding assistant whose primary job is to generate custom views based on the provided postgresSQL schema"
        },
        {
            role: "user",
            content: `Generate a custom view based on the following postgresSQL schema. The view should include all necessary columns and fields as described, with proper SQL syntax for creating views. 
                    Ensure that the view is optimized for the user's needs and includes any relevant data from the schema. Additionally, consider any provided context about the application type to optimize the view's 
                    relevance and functionality.

            SQL Schema:
            ${content}

            Additional Context:
            ${context}
            
            Please format the SQL view with proper data types, constraints, and relationships. Include comments in the SQL for clarity. Only reply with SQL and no additional explanations or text`
            

        }

       ],
       model: "gpt-4o",
    });

    const resolvedFirstChoice = completion.choices[0].message.content;

    return resolvedFirstChoice as string;
}