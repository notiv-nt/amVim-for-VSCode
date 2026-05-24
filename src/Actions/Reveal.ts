import { window, Range, TextEditorRevealType } from 'vscode';
import { getCurrentMode } from '../extension';
import { ModeID } from '../Modes/Mode';
import { UtilSelection } from '../Utils/Selection';

export class ActionReveal {
    static primaryCursor(args: { revealType?: TextEditorRevealType } = {}): Thenable<boolean> {
        args.revealType =
            args.revealType === undefined ? TextEditorRevealType.Default : args.revealType;

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        const currentMode = getCurrentMode();
        const activePosition = UtilSelection.getCursorPosition(activeTextEditor.selection, {
            isVisualMode:
                currentMode?.id === ModeID.VISUAL || currentMode?.id === ModeID.VISUAL_LINE,
        });
        activeTextEditor.revealRange(new Range(activePosition, activePosition), args.revealType);

        return Promise.resolve(true);
    }
}
