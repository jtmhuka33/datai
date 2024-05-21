import * as vscode from "vscode";
import fs from "fs";
import path from "path";
import { generateBlogSchemaOpenAI } from "./generateBloggingSchema/genertateBloggingSchema";
import { readFileContent } from "./utils/readFileContent";
import { generateBlogApiOPENAI } from "./generateBloggingApi/generateBloggingApi";

/**
 * this function is triggered to generate files and code that resembles
 * the schema of a typical blogging application
 */
// Define a function to generate an SQL schema for a blogging platform
async function generateSchemaBlogging() {
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
  const folderPath = path.join(workspacePath, "/src/schema");

  // Check if the 'schema' folder does not exist
  if (!fs.existsSync(folderPath)) {
    // Create the folder and all necessary parent folders with 'recursive: true' option5
    fs.mkdirSync(folderPath, { recursive: true });
    // Show an information message confirming the folder creation
    vscode.window.showInformationMessage(`Folder 'schema' created.`);
  }

  // Define the SQL schema content as a string
  const content = await generateBlogSchemaOpenAI();

  // Define the full path for the new SQL file within the 'schema' folder
  const filepath = path.join(folderPath, "schema.sql");

  // Write the schema content to the file at the designated filepath
  fs.writeFile(filepath, content, (err: any) => {
    // Check if there was an error during file writing
    if (err) {
      // If an error occurred, display an error message with the error detail
      vscode.window.showErrorMessage("Error writing file: " + err.message);
    } else {
      // If the file was successfully created, show a confirmation message with the file location
      vscode.window.showInformationMessage(
        `File schema.sql created at ${folderPath}`
      );
    }
  });
}

async function generateAPIBlogging() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showErrorMessage("No Workspace is open!");
    return;
  }
  
  const workspacePath = workspaceFolders[0].uri.fsPath;
  const folderPath = path.join(workspacePath, "/src/routes");
  const schemaFolderPath = path.join(workspacePath, "/src/schema");

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    vscode.window.showInformationMessage(`Folder 'routes' created `);
  }

  const schemaContent = await readFileContent(
    path.join(schemaFolderPath, "schema.sql")
  );

  if (!schemaContent) {
    vscode.window.showErrorMessage("Schema Content is NULL");
    return;
  }

  const tableNames: string[] = [];
  const tableRegex = /CREATE TABLE\s+(\w+)/;
  const filePaths: string[] = [];


  //extract table names to create separate files. 
  schemaContent.forEach(schema => {
    const match = schema.match(tableRegex);
    if (match) {
      tableNames.push(match[1]);
    }
  });

  tableNames.forEach(name => {
    filePaths.push(path.join(folderPath, name + '.js'.toLowerCase()));
  });

  for (let i = 0; i < schemaContent.length; i++) {
    const content = await generateBlogApiOPENAI(schemaContent[i]);
    fs.appendFile(filePaths[i], content, (err:any) => {
      if (err) { 
        vscode.window.showErrorMessage("Error writing file: " + err.message);
      } else {
        vscode.window.showInformationMessage(`Done!`);
      }
    });
  } 
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

  let bloggingApi = vscode.commands.registerCommand(
    "datai.bloggingApplicationApi",
    generateAPIBlogging
  );
  context.subscriptions.push(bloggingSchema);
  context.subscriptions.push(disposable);
  context.subscriptions.push(bloggingApi);
}

export function deactivate() {}
