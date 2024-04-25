import * as vscode from "vscode";

import fs from "fs";
import path from "path";

/**
 * this function is triggered to generate files and code that resembles
 * the schema of a typical blogging application
 */
function generateSchemaBlogging() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showErrorMessage("No Workspace is open!");
    return;
  }
  const workspacePath = workspaceFolders[0].uri.fsPath;
  const folderPath = path.join(workspacePath, "schema");

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    vscode.window.showInformationMessage(`Folder 'schema' created.`);
  }
  const content =
    "-- SQL Database Preset One Schema\nCREATE TABLE example (id INT, data VARCHAR(100));";
  const filepath = path.join(folderPath, "schema.sql");
  fs.writeFile(filepath, content, (err:any) => {
	if (err) {
		vscode.window.showErrorMessage('Error writing file: ' + err.message);
	} else {
		vscode.window.showInformationMessage(`File schema.sql created at ${folderPath}`);
	}
  });

  
  fs.writeFileSync(filepath, content);
  vscode.window.showInformationMessage("Blogging Schema Created");
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "datai" is now active!');

  let disposable = vscode.commands.registerCommand("datai.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from datai!");
  });

  //Test
  let bloggingSchema = vscode.commands.registerCommand(
    "datai.bloggingApplicationSchema",
    generateSchemaBlogging
  );
  context.subscriptions.push(bloggingSchema);
  context.subscriptions.push(disposable);
}

export function deactivate() {}
