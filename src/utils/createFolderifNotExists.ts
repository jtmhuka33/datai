import * as vscode from "vscode";
import path from "path";
import fs from "fs";

export function createFolderIfNotExists(folderPath:string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      vscode.window.showInformationMessage(`Folder '${path.basename(folderPath)}' created.`);
    }
  }