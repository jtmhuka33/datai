import * as vscode from "vscode";


export default function getWorkspacePath():string|null {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    // Check if there is no open workspace, and if so, show an error message and exit the function
    if (!workspaceFolders) {
      vscode.window.showErrorMessage("No Workspace is open!");
      return null;
    }
    // Get the file system path of the first workspace folder
    const workspacePath = workspaceFolders[0].uri.fsPath;

    return workspacePath;
}