import { commands, window } from 'vscode';
import { StaticReflect } from '../LanguageExtensions/StaticReflect';
import { SymbolMetadata } from '../Symbols/Metadata';

export class ActionSurround {
    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static surroundSingleQuote(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('default:type', { text: "'" });
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static surroundDoubleQuote(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('default:type', { text: '"' });
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static surroundBacktick(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('default:type', { text: '`' });
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static surroundRoundBrace(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('default:type', { text: '(' });
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static surroundCurlyBrace(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('default:type', { text: '{' });
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static surroundSquareBrace(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('default:type', { text: '[' });
    }
}
