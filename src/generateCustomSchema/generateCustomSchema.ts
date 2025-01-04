import OpenAI from "openai";

export async function generateCustomSchema (application_context: string | null, table_definitions: string): Promise<string> {

    const openai = new OpenAI({ apiKey: process.env.API_KEY});
    const completion = await openai.chat.completions.create({
       messages:[
        {
            role: "system",
            content: "You are helpful coding assistant whose primary job is to code a typical postgresql schema using the provided tables and accounting for all tables and their relationships. Use markdown"
        },
        {
            role: "user",
            content: `Generate a PostgreSQL schema based on the following user specifications. The schema should include all necessary tables and fields as described, with proper SQL syntax for creating tables. 
                    Ensure that primary keys and foreign keys are correctly defined based on the user inputs. Additionally, consider any provided context about the application type to optimize the schema's 
                    relevance and functionality.

            Application Context: ${application_context}
            User-Defined Tables and Columns:
            ${table_definitions}
            
            Please format the SQL schema with proper data types, constraints, and relationships. Include comments in the SQL for clarity. Only reply with SQL and no additional explanations or text`
            

        }

       ],
       model: "gpt-4o",
    });

    const resolvedFirstChoice = completion.choices[0].message.content;

    return resolvedFirstChoice as string;
}