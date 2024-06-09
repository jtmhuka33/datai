import * as vscode from "vscode";
import fs from "fs";

export function writeFile(filepath:string, content:string, successMessage:string) {
    fs.writeFile(filepath, content, (err) => {
      if (err) {
        vscode.window.showErrorMessage("Error writing file: " + err.message);
      } else {
        vscode.window.showInformationMessage(successMessage);
      }
    });
  }