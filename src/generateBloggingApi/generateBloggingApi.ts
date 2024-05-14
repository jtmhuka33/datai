import OpenAI from "openai";

export async function generateBlogApiOPENAI(content: string) {
  const openai = new OpenAI({ apiKey: process.env.API_KEY });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are helpful coding assistant whose primary job is to code a typical api accounting for the provided postgresql schema code." +
           "Make sure to include full implementation for each API request. Do not include module imports as these may already exist",
      },
      {
        role: "user",
        content: `"Generate a comprehensive Node.js/Express backend API based on a dynamically generated PostgreSQL schema below and include ALL the implementation logic for each Operation and table described below. The API should include routes to handle CRUD (Create, Read, Update, Delete) operations for each table provided in the schema. Ensure that the API includes detailed error handling, uses async/await for database interactions, and supports advanced features such as filtering, sorting, and pagination.

        The implementation should adhere to the following guidelines:
        1. **CRUD Operations**:
           - **Create**: Include routes that allow for adding new entries to each table. Ensure validation of incoming data to maintain data integrity.
           - **Read**: Implement routes to retrieve entries, supporting filtering by any field, sorting by relevant fields, and pagination to handle large datasets.
           - **Update**: Allow updates to existing entries, ensuring that only valid and authorized changes are applied. Use appropriate HTTP methods and include data validation.
           - **Delete**: Provide secure routes to delete entries, implementing necessary checks to prevent unauthorized deletions.
        
        2. **Security and Validation**:
           - Implement middleware or helpers to validate incoming requests to protect against common vulnerabilities such as SQL injection.
           - Ensure sensitive information such as passwords are handled securely, using hashing and encryption as appropriate.
        
        3. **Database Interactions**:
           - Use parameterized queries or an ORM to safely interact with the database.
           - Employ transactions where necessary, particularly in operations that involve multiple steps or modifications of multiple tables.
        
        4. **Error Handling**:
           - Implement comprehensive error handling to catch and respond to database errors, validation failures, and other runtime exceptions.
           - Ensure that error responses provide enough information for debugging but do not expose sensitive system details.
        
        5. **Documentation**:
           - Each route should be clearly commented, explaining its purpose, the parameters it accepts, and the format of the response it returns.
                  --- PostgreSQL Schema Begin --- ${content} --- PostgreSQL Schema End --- 
                  Please format the API code with proper indentation and include comments for each route explaining the purpose and the parameters it accepts. 
                  Use async/await for all database interactions. Only include the code and no other text`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  const resolvedFirstChoice = completion.choices[0].message.content;

  return resolvedFirstChoice as string;
}
