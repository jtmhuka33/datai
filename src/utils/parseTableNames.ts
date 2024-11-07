export function parseTableNames(schemaContent: string): string[] {
    const tableRegex = /CREATE\s+TABLE\s+(\w+)/gi;
    let match;
    const tableNames: string[] = [];
  
    while ((match = tableRegex.exec(schemaContent)) !== null) {
      tableNames.push(match[1]);
    }
  
    return tableNames;
  }