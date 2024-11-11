import * as vscode from "vscode";

export async function readFileContentComplete(filePath: string) {
  try {
    const fileUri = vscode.Uri.file(filePath);

    const binaryContent = await vscode.workspace.fs.readFile(fileUri);

    const contentWhole = Buffer.from(binaryContent).toString("utf-8"); 

    return contentWhole;
    
  } catch (error) {
    console.error("Error reading file: ", error);
    return null;
  }
}