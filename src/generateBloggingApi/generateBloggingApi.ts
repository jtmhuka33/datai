import OpenAI from "openai";

export async function generateBlogApiOPENAI(content: string) {
  const openai = new OpenAI({ apiKey: process.env.API_KEY });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are helpful coding assistant whose primary job is to code a tyical api accouting for the provided postgresql schema code.",
      },
      {
        role: "user",
        content: `Given the following PostgreSQL schema for a blogging application, generate Node.js/Express backend API code. The API should include routes to handle CRUD (Create, Read, Update, Delete) operations for each table in the schema. Ensure the API supports all necessary query parameters for filtering, sorting, and pagination. --- PostgreSQL Schema Begin --- ${content} --- PostgreSQL Schema End --- Please format the API code with proper indentation and include comments for each route explaining the purpose and the parameters it accepts. Use async/await for all database interactions. Only include the code and no other text`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  const resolvedFirstChoice = completion.choices[0].message.content;

  return resolvedFirstChoice as string;
}
