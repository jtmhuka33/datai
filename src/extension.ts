
import * as vscode from 'vscode';


const fs = require("fs");
const path = require("path");

/**
 * this function is triggered to generate files and code that resembles
 * the schema of a typical blogging application
 */
function generateSchemaBlogging () {
	const filepath = vscode.workspace.workspaceFolders + '/schema.sql';
	const content = '-- SQL Database Preset One Schema\nCREATE TABLE example (id INT, data VARCHAR(100));';
	fs.writeFileSync(filepath, content);
	vscode.window.showInformationMessage('Blogging Schema Created');
}

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "datai" is now active!');

	let disposable = vscode.commands.registerCommand('datai.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from datai!');
	});

	//Test
	let bloggingSchema = vscode.commands.registerCommand('datai.bloggingApplicationSchema', generateSchemaBlogging);
	context.subscriptions.push(bloggingSchema);
	context.subscriptions.push(disposable);
}

export function deactivate() {}
