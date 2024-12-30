import OpenAI from "openai";

export async function generateBlogSchemaOpenAI() {
  const openai = new OpenAI({ apiKey: process.env.API_KEY });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are helpful coding assistant whose primary job is to code a typical postgresql schema for a typical blogging application accounting for all basic tables and their relations. Use markdown for formatting",
      },
      {
        role: 'user',
        content: `Create a detailed PostgreSQL schema for a typical blogging web application. 
        The schema should include the following tables: Users, Posts, Comments, and Tags. 
        Each table should have relevant fields:
        1. **Users** - Include fields for user_id (primary key), username, password, email, and created_at timestamp.
        2. **Posts** - Include fields for post_id (primary key), user_id (foreign key linked to Users), title, content (text field), published_date, and last_modified_date.
        3. **Comments** - Include fields for comment_id (primary key), post_id (foreign key linked to Posts), user_id (foreign key linked to Users), comment_text, and timestamp.
        4. **Tags** - Include fields for tag_id (primary key) and tag_name.
        5. **PostTags** - A junction table linking Posts and Tags with fields post_id (foreign key) and tag_id (foreign key).
        Provide SQL statements to create these tables with appropriate data types and constraints, including primary keys, foreign keys, not null constraints, and any other relevant constraints.
        Use standard SQL practices for naming and data integrity. Ensure the schema supports basic blog functionalities like user management, posting, commenting, and tagging.
        Only include the code and no other text. 
        Please add double quotes around column names and table names.`
      }
    ],
    model: "gpt-4o",
  });
  const resolvedFirstChoice = completion.choices[0].message.content;

  return resolvedFirstChoice as string;
}
