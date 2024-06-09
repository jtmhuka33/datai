import OpenAI from "openai";

/**
 * This function was created as part of the MVP testing process
 * to test the generation prompt. 
 * 
 * @param content 
 * @returns string
 */
export async function generateBlogApiOPENAI(content: string) {
  const openai = new OpenAI({ apiKey: process.env.API_KEY });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are helpful coding assistant whose primary job is to code a typical api accounting for the provided postgresql schema code." +
           "Make sure to include full implementation for each API request. Do not include module imports or db connection as these already exist",
      },
      {
        "role": "user",
        "content": "Generate a comprehensive Node.js/Express backend API based on a dynamically generated PostgreSQL schema provided below and include" +
        "ALL the implementation logic for each CRUD (Create, Read, Update, Delete) operation and table described." + 
        "The API should use express. Router format and be exportable." +
        "Ensure the API includes detailed error handling, uses async/await for database interactions, and supports advanced" + 
        "features such as filtering, sorting, and pagination. The implementation should adhere to the following guidelines:" + 
        "- Export routes using express.Router.\n" + 
        "- Account for the fact that Each table has its own pre generated route file." +
        " **CRUD Operations**" + 
        "- **Create**: Routes to add new entries to each table. Ensure validation of incoming data to maintain data integrity." +
        "- **Read**: Routes to retrieve entries, supporting filtering by any field, sorting by relevant fields, and pagination to handle large datasets." +
        "- **Update**: Allow updates to existing entries, ensuring that only valid and authorized changes are applied. Use appropriate HTTP methods and include data validation." +
        "- **Delete**: Provide secure routes to delete entries, implementing necessary checks to prevent unauthorized deletions. "+
        "- **Security and Validation**:   Implement middleware or helpers to validate incoming requests to protect against common vulnerabilities such as SQL injection.\n" +   
        "- Ensure sensitive information such as passwords are handled securely, using hashing and encryption as appropriate. "+
        " **Database Interactions**:   - Use parameterized queries or to safely interact with the database.\n "+  
        "- Employ transactions where necessary, particularly in operations that involve multiple steps or modifications of multiple tables.\n\n5." + 
        " **Error Handling**:   - Implement comprehensive error handling to catch and respond to database errors, validation failures, and other runtime exceptions.\n" +
        " - Ensure that error responses provide enough information for debugging but do not expose sensitive system details.\n\n6." +
        " **Documentation**:\n   - Each route should be clearly commented, explaining its purpose, the parameters it accepts, and the format of the response it returns."+
        `\n\n --- PostgreSQL Schema Begin --- ${content} --- PostgreSQL Schema End --- `+ 
        "\n\n Please format the API code with proper indentation and include comments for each route explaining the purpose and the parameters it accepts. Use async/await for all database interactions. Only include the code and no other text."
      }
    ],
    model: "gpt-4o",
  });
  const resolvedFirstChoice = completion.choices[0].message.content;

  return resolvedFirstChoice as string;
}
