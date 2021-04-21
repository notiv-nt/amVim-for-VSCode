import { commands, window } from 'vscode';

export class ActionJump {
    static jumpToBracket(): Thenable<boolean | undefined> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('editor.action.jumpToBracket');
    }
}
