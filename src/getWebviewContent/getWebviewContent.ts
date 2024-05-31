export function getWebviewContent () {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Schema Designer</title>
    </head>
    <body>
        <h1>Create your Schema</h1>
        <form id="schemaForm">
            <div>
                <input type="text" id="tableName" placeholder="Enter Table Name" />
                <button type="button" onclick="addTable()">Add Table</button>
            </div>
            <div id="tablesContainer"></div>
            <button type="submit">Generate Schema</button>
        </form>
        
        <script>
            const vscode = acquireVsCodeApi();

            function addTable() {
                const tableName = document.getElementById('tableName').value;
                const container = document.getElementById('tablesContainer');
                const tableDiv = document.createElement('div');
                tableDiv.innerHTML = '<strong>' + tableName + '</strong>: <input type="text" placeholder="Enter column definitions" />';
                container.appendChild(tableSpec);
            }

            document.getElementById('schemaForm').addEventListener('submit', event => {
                event.preventDefault();
                const schema = {}; // Build your schema object here
                vscode.postMessage({
                    command: 'submitSchema',
                    data: schema
                });
            });
        </script>
    </body>
    </html>`;
}