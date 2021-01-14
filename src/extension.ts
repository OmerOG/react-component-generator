import * as vscode from 'vscode';
import { generateReactComponent } from './reactComponentGenerator';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand(
		'react-component-generator.generateReactComponent',
		generateReactComponent
	));
}

// this method is called when your extension is deactivated
export function deactivate() { }
