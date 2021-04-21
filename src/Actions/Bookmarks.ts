import { commands, window } from 'vscode';

export class ActionBookmark {
    static toggleBookmark(): Thenable<boolean | undefined> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('bookmarks.toggle');
    }

    static jumpToNext(): Thenable<boolean | undefined> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('bookmarks.jumpToNext');
    }

    static jumpToPrevious(): Thenable<boolean | undefined> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('bookmarks.jumpToPrevious');
    }
}
