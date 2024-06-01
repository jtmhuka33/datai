import * as vscode from "vscode";

export function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
  const scriptPath = vscode.Uri.joinPath(
    extensionUri,
    "webview-app",
    "build",
    "static",
    "js",
    "main.js"
  );
  const scriptUri = webview.asWebviewUri(scriptPath);

  const stylePath = vscode.Uri.joinPath(
    extensionUri,
    "webview-app",
    "build",
    "static",
    "css",
    "main.css"
  );
  const styleUri = webview.asWebviewUri(stylePath);

  return ` <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link href="${styleUri}" rel="stylesheet">
    </head>
    <body>
        <div id="root"></div>
        <script src="${scriptUri}"></script>
    </body>
    </html>`;
}
