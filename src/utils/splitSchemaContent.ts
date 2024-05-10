export function splitSchemaContent(schemaContent: string): string[] {
  const tables = schemaContent.split(/(?CREATE TABLE)/g);

  return tables.filter(table => table.trim() !== '');
}
