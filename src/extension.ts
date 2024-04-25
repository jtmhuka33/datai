import * as vscode from "vscode";
import fs from "fs";
import path from "path";


const dotenv = require("dotenv").config();
/**
 * this function is triggered to generate files and code that resembles
 * the schema of a typical blogging application
 */
// Define a function to generate an SQL schema for a blogging platform
function generateSchemaBlogging() {
	// Access the list of open workspace folders
	const workspaceFolders = vscode.workspace.workspaceFolders;
  
	// Check if there is no open workspace, and if so, show an error message and exit the function
	if (!workspaceFolders) {
	  vscode.window.showErrorMessage("No Workspace is open!");
	  return;
	}
  
	// Get the file system path of the first workspace folder
	const workspacePath = workspaceFolders[0].uri.fsPath;
  
	// Define the path for a new folder called "schema" inside the workspace
	const folderPath = path.join(workspacePath, "schema");
  
	// Check if the 'schema' folder does not exist
	if (!fs.existsSync(folderPath)) {
	  // Create the folder and all necessary parent folders with 'recursive: true' option
	  fs.mkdirSync(folderPath, { recursive: true });
	  // Show an information message confirming the folder creation
	  vscode.window.showInformationMessage(`Folder 'schema' created.`);
	}
  
	// Define the SQL schema content as a string
	const content =
	  "-- SQL Database Preset One Schema\nCREATE TABLE example (id INT, data VARCHAR(100));";
  
	// Define the full path for the new SQL file within the 'schema' folder
	const filepath = path.join(folderPath, "schema.sql");
  
	// Write the schema content to the file at the designated filepath
	fs.writeFile(filepath, content, (err:any) => {
	  // Check if there was an error during file writing
	  if (err) {
		// If an error occurred, display an error message with the error detail
		vscode.window.showErrorMessage('Error writing file: ' + err.message);
	  } else {
		// If the file was successfully created, show a confirmation message with the file location
		vscode.window.showInformationMessage(`File schema.sql created at ${folderPath}`);
	  }
	});
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
