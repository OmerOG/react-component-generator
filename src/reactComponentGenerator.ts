import { window, workspace, Uri } from 'vscode';
import { reactFunctionalComponentTemplate, reactModuleCssTemplate } from './templates';

export async function generateReactComponent(uri?: Uri) {
    if (!uri) {
        return window.showErrorMessage('No file path found');
    }

    const componentName = await window.showInputBox();

    if (!componentName) {
        return console.error('No component name passed');
    }

    const directory = await GetComponentDirectory(uri, componentName);
    writeComponentFiles(directory, componentName);
}

async function isValidDirectory(uri: Uri) {
    try {
        await workspace.fs.readDirectory(uri);
        return true;
    } catch {
        return false;
    }
}

async function GetComponentDirectory(clickedUri: Uri, componentName: string) {
    const { path } = clickedUri;

    if (await isValidDirectory(clickedUri)) {
        return path.concat(`/${componentName}`);
    }

    const pathArray = path.split('/');
    pathArray.pop();
    const newPath = pathArray.join('/');

    return newPath.concat(`/${componentName}`);
}

async function writeComponentFiles(directory: string, componentName: string) {
    writeFile(`${directory}/${componentName}.tsx`, reactFunctionalComponentTemplate(componentName));
    writeFile(`${directory}/${componentName}.module.css`, reactModuleCssTemplate(componentName));
}


function writeFile(path: string, content: string) {
    const contentBuffer = Buffer.from(content);
    const fileContent = new Uint8Array(contentBuffer);
    const fileUri = Uri.file(path);

    workspace.fs.writeFile(fileUri, fileContent);
}