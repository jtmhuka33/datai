import * as vscode from "vscode";
import fs from "fs";
import path from "path";

import { generateBlogSchemaOpenAI } from "./generateBloggingSchema/genertateBloggingSchema";
import { readFileContent } from "./utils/readFileContent";
import { generateBlogApiOPENAI } from "./generateBloggingApi/generateBloggingApi";
import { getWebviewContent } from "./getWebviewContent/getWebviewContent";
import { generateCustomSchema } from "./generateCustomSchema/generateCustomSchema";
import getWorkspacePath from "./utils/getWorkspacePath";
import { createFolderIfNotExists } from "./utils/createFolderifNotExists";
import { writeFile } from "./utils/writeFile";

async function generateSchemaBlogging() {
  const workspacePath = getWorkspacePath();
  if (!workspacePath) {
    return;
  }

  const folderPath = path.join(workspacePath, "/src/schema");
  createFolderIfNotExists(folderPath);

  const content = await generateBlogSchemaOpenAI();
  const filepath = path.join(folderPath, "schema.sql");
  writeFile(filepath, content, `File schema.sql created at ${folderPath}`);
}

async function generateAPIBlogging() {
  const workspacePath = getWorkspacePath();
  if (!workspacePath) {
    return;
  }

  const folderPath = path.join(workspacePath, "/src/routes");
  const schemaFolderPath = path.join(workspacePath, "/src/schema");
  createFolderIfNotExists(folderPath);

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

  schemaContent.forEach((schema) => {
    const match = schema.match(tableRegex);
    if (match) {
      tableNames.push(match[1]);
    }
  });

  tableNames.forEach((name) => {
    filePaths.push(path.join(folderPath, name + ".js".toLowerCase()));
  });

  for (let i = 0; i < schemaContent.length; i++) {
    const content = await generateBlogApiOPENAI(schemaContent[i]);
    fs.appendFile(filePaths[i], content, (err: any) => {
      if (err) {
        vscode.window.showErrorMessage("Error writing file: " + err.message);
      } else {
        vscode.window.showInformationMessage(`Done!`);
      }
    });
  }
}

async function generateCustomApi() {
  const workspacePath = getWorkspacePath();
  if (!workspacePath) {
    return;
  }

  const folderPath = path.join(workspacePath, "/src/routes");
  const schemaFolderPath = path.join(workspacePath, "/src/schema");
  createFolderIfNotExists(folderPath);

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

  schemaContent.forEach((schema) => {
    const match = schema.match(tableRegex);
    if (match) {
      tableNames.push(match[1]);
    }
  });

  tableNames.forEach((name) => {
    filePaths.push(path.join(folderPath, name + ".js".toLowerCase()));
  });

  for (let i = 0; i < schemaContent.length; i++) {
    const content = await generateBlogApiOPENAI(schemaContent[i]);
    fs.appendFile(filePaths[i], content, (err: any) => {
      if (err) {
        vscode.window.showErrorMessage("Error writing file: " + err.message);
      } else {
        vscode.window.showInformationMessage(`Done!`);
      }
    });
  }
}

function handleWebviewMessage(message: { type: string; data: string }) {
  if (message.type === "generateCustomSchema") {
    const workspacePath = getWorkspacePath();
    if (!workspacePath) {
      return;
    }

    const folderPath = path.join(workspacePath, "/src/schema");
    createFolderIfNotExists(folderPath);

    generateCustomSchema("Do what makes sense", message.data).then((result) => {
      const filepath = path.join(folderPath, "schema.sql");
      writeFile(filepath, result, `File schema.sql created at ${folderPath}`);
    });
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "datai" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand("datai.helloWorld", () => {
      vscode.window.showInformationMessage("Hello World from datai!");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datai.customApiFromCustomSchema",
      generateCustomApi
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datai.bloggingApplicationSchema",
      generateSchemaBlogging
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "datai.bloggingApplicationApi",
      generateAPIBlogging
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("datai.openSchemaDesigner", () => {
      const panel = vscode.window.createWebviewPanel(
        "schemaDesigner",
        "Schema Designer",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.joinPath(
              context.extensionUri,
              "./webview-app/build/static/"
            ),
          ],
        }
      );

      panel.webview.html = getWebviewContent(
        panel.webview,
        context.extensionUri
      );

      panel.webview.onDidReceiveMessage(handleWebviewMessage);
    })
  );
}

export function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
