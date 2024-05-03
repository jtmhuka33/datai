import * as vscode from "vscode";

export async function readFileContent(filePath: string) {
  try {
    const fileUri = vscode.Uri.file(filePath);

    const binaryContent = await vscode.workspace.fs.readFile(fileUri);

    const content = Buffer.from(binaryContent).toString("utf-8");
    
    return content;
  } catch (error) {
    console.error("Error reading file: ", error);
    return null;
  }
}
