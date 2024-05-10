import * as vscode from "vscode";
import { splitSchemaContent } from "./splitSchemaContent";

export async function readFileContent(filePath: string) {
  try {
    const fileUri = vscode.Uri.file(filePath);

    const binaryContent = await vscode.workspace.fs.readFile(fileUri);

    const contentWhole = Buffer.from(binaryContent).toString("utf-8");

    const contentSplit = splitSchemaContent(contentWhole);

    console.log(contentSplit);

    return contentSplit;
    
  } catch (error) {
    console.error("Error reading file: ", error);
    return null;
  }
}
