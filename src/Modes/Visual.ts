import { TextEditorRevealType, window } from 'vscode';
import { StaticReflect } from '../LanguageExtensions/StaticReflect';
import { SymbolMetadata } from '../Symbols/Metadata';
import { RangeOffset } from '../Types/RangeOffset';
import { Mode, ModeID } from './Mode';
import { Configuration } from '../Configuration';
import { CommandMap } from '../Mappers/Command';
import { ActionRelativeLineNumbers } from '../Actions/RelativeLineNumbers';
import { ActionMoveCursor } from '../Actions/MoveCursor';
import { ActionPage, PageMoveType } from '../Actions/Page';
import { ActionSelection } from '../Actions/Selection';
import { ActionRegister } from '../Actions/Register';
import { ActionDelete } from '../Actions/Delete';
import { ActionInsert } from '../Actions/Insert';
import { ActionCase } from '../Actions/Case';
import { ActionReplace } from '../Actions/Replace';
import { ActionIndent } from '../Actions/Indent';
import { ActionJoinLines } from '../Actions/JoinLines';
import { ActionFilter } from '../Actions/Filter';
import { ActionFind } from '../Actions/Find';
import { ActionNativeEscape } from '../Actions/NativeEscape';
import { ActionMode } from '../Actions/Mode';
import { ActionFold } from '../Actions/Fold';
import { MotionLine } from '../Motions/Line';
import { ActionReveal } from '../Actions/Reveal';
import { ActionBlockCursor } from '../Actions/BlockCursor';
import { ActionBlockOutlineCursor } from '../Actions/BlockOutlineCursor';
import { ActionBookmark } from '../Actions/Bookmarks';
import { ActionJump } from '../Actions/Jump';
import { ActionSurround } from '../Actions/Surround';

export class ModeVisual extends Mode {
    id = ModeID.VISUAL;
    name = 'VISUAL';

    private maps: CommandMap[] = [
        {
            keys: '{motion}',
            actions: [ActionMoveCursor.byMotions],
            args: { isVisualMode: true },
        },

        // {
        //     keys: '{N} {motion}',
        //     actions: [ActionMoveCursor.byMotions],
        //     args: { isVisualMode: true },
        // },
        // { keys: '{textObject}', actions: [ActionSelection.expandByTextObject] },

        // {
        //     keys: 'ctrl+b',
        //     actions: [ActionPage.up],
        //     args: { moveType: PageMoveType.Select },
        // },
        // {
        //     keys: 'ctrl+f',
        //     actions: [ActionPage.down],
        //     args: { moveType: PageMoveType.Select },
        // },

        // {
        //     keys: 'I',
        //     actions: [ActionSelection.shrinkToStarts, ActionMode.toInsert],
        // },
        // {
        //     keys: 'A',
        //     actions: [ActionSelection.shrinkToEnds, ActionMode.toInsert],
        // },

        {
            keys: 'backspace',
            actions: [ActionDelete.selectionsOrLeft],
            args: { shouldYank: false },
        },
        // {
        //     keys: 'delete',
        //     actions: [ActionDelete.selectionsOrRight],
        //     args: { shouldYank: true },
        // },
        {
            keys: 'q',
            actions: [ActionDelete.selectionsOrRight],
            args: { shouldYank: true },
        },
        {
            keys: 'Q',
            actions: [ActionDelete.byLines],
            args: { shouldYank: true },
        },
        // {
        //     keys: 'd',
        //     actions: [ActionDelete.selectionsOrRight],
        //     args: { shouldYank: true },
        // },
        // {
        //     keys: 'D',
        //     actions: [ActionDelete.byLines],
        //     args: { shouldYank: true },
        // },
        // {
        //     keys: 'c',
        //     actions: [ActionDelete.selectionsOrRight, ActionMode.toInsert],
        //     args: { shouldYank: true },
        // },
        // {
        //     keys: 'C',
        //     actions: [ActionDelete.byLines, ActionInsert.newLineBefore, ActionMode.toInsert],
        //     args: { shouldYank: true },
        // },
        {
            keys: 'o',
            actions: [ActionDelete.selectionsOrRight, ActionMode.toInsert],
            args: { shouldYank: true },
        },
        // {
        //     keys: 'S',
        //     actions: [ActionDelete.byLines, ActionInsert.newLineBefore, ActionMode.toInsert],
        //     args: { shouldYank: true },
        // },
        {
            keys: 'f',
            actions: [ActionRegister.yankSelections, ActionSelection.shrinkToStarts],
        },
        // {
        //     keys: 'Y',
        //     actions: [
        //         ActionRegister.yankLines,
        //         ActionSelection.shrinkToStarts,
        //         () =>
        //             ActionMoveCursor.byMotions({
        //                 motions: [MotionLine.start()],
        //             }),
        //     ],
        // },
        {
            keys: 'D',
            actions: [ActionJoinLines.onSelections, ActionSelection.shrinkToActives],
        },

        {
            keys: 'l',
            actions: [ActionReplace.selectionsWithRegister],
            args: { shouldYank: false },
        },
        {
            keys: 'L',
            actions: [ActionReplace.selectionsWithRegister],
            args: { shouldYank: false },
        },

        {
            keys: 'p {char}',
            actions: [ActionReplace.selectionsWithCharacter, ActionSelection.shrinkToStarts],
        },

        { keys: '8', actions: [ActionSelection.moveSelectionToPreviousFindMatch] },
        { keys: '9', actions: [ActionSelection.moveSelectionToNextFindMatch] },

        { keys: '1', actions: [ActionCase.lowercaseSelections] },
        { keys: '2', actions: [ActionCase.uppercaseSelections] },
        {
            keys: '3',
            actions: [ActionCase.switchSelections /* , ActionSelection.shrinkToStarts */],
        },
        // {
        //     keys: 'u',
        //     actions: [ActionCase.lowercaseSelections, ActionSelection.shrinkToStarts],
        // },
        // {
        //     keys: 'U',
        //     actions: [ActionCase.uppercaseSelections, ActionSelection.shrinkToStarts],
        // },
        // {
        //     keys: 'g ?',
        //     actions: [ActionCase.rot13Selections, ActionSelection.shrinkToStarts],
        // },

        // { keys: '=', actions: [ActionFilter.Format.bySelections] },

        // {
        //     keys: '<',
        //     actions: [ActionIndent.decrease],
        //     args: { isVisualMode: true },
        // },
        // {
        //     keys: '>',
        //     actions: [ActionIndent.increase],
        //     args: { isVisualMode: true },
        // },

        { keys: '=', actions: [ActionIndent.reindent] },

        // { keys: '/', actions: [ActionFind.focusFindWidget] },

        { keys: 'K', actions: [ActionMode.toVisualLine] },
        { keys: 'k', actions: [ActionSelection.shrinkToActives] },

        { keys: 'r', actions: [ActionSelection.reverseSelection] },

        // {
        //     keys: '`',
        //     actions: [ActionReveal.primaryCursor],
        //     args: { revealType: TextEditorRevealType.InCenter },
        // },
        {
            keys: ';',
            actions: [ActionReveal.primaryCursor],
            args: { revealType: TextEditorRevealType.InCenter },
        },
        // {
        //     keys: 'u',
        //     actions: [ActionCase.lowercaseSelections, ActionSelection.shrinkToStarts],
        // },
        // {
        //     keys: 'U',
        //     actions: [ActionCase.uppercaseSelections, ActionSelection.shrinkToStarts],
        // },

        { keys: 'v', actions: [ActionBookmark.toggleBookmark] },
        { keys: 'w', actions: [ActionBookmark.jumpToNext] },
        { keys: 'W', actions: [ActionBookmark.jumpToPrevious] },

        { keys: 'm', actions: [ActionSelection.selectToBracket] },

        { keys: "'", actions: [ActionSurround.surroundSingleQuote] },
        { keys: '"', actions: [ActionSurround.surroundDoubleQuote] },
        { keys: '(', actions: [ActionSurround.surroundRoundBrace] },
        { keys: '{', actions: [ActionSurround.surroundCurlyBrace] },
        { keys: '[', actions: [ActionSurround.surroundSquareBrace] },

        // { keys: 'z c', actions: [ActionFold.fold] },
        // { keys: 'z o', actions: [ActionFold.unfold] },
        // { keys: 'z M', actions: [ActionFold.foldAll] },
        // { keys: 'z R', actions: [ActionFold.unfoldAll] },

        // {
        //     keys: 'ctrl+c',
        //     actions: [ActionNativeEscape.press, ActionSelection.shrinkToActives],
        // },
        // {
        //     keys: 'ctrl+[',
        //     actions: [ActionNativeEscape.press, ActionSelection.shrinkToActives],
        // },
        {
            keys: 'escape',
            actions: [ActionNativeEscape.press, ActionSelection.shrinkToActives],
        },
    ];

    constructor() {
        super();

        this.maps.forEach((map) => {
            this.mapper.map(map.keys, map.actions, map.args);
        });
    }

    enter(): void {
        super.enter();

        ActionSelection.expandToOne();
        ActionBlockCursor.on();

        if (Configuration.smartRelativeLineNumbers) {
            ActionRelativeLineNumbers.on();
        }
    }

    exit(): void {
        super.exit();

        ActionBlockCursor.off();
    }

    private _recordedCommandMaps: CommandMap[];
    get recordedCommandMaps() {
        return this._recordedCommandMaps;
    }

    protected onWillCommandMapMakesChanges(map: CommandMap): void {
        const actions = map.actions.filter((action) => {
            return (
                StaticReflect.getMetadata(SymbolMetadata.Action.shouldSkipOnRepeat, action) !== true
            );
        });

        const args = Object.assign(
            {
                preferredRelativeRange: window.activeTextEditor
                    ? new RangeOffset(window.activeTextEditor.selection)
                    : undefined,
            },
            map.args,
        );

        this._recordedCommandMaps = [
            {
                keys: map.keys,
                actions: actions,
                args: args,
                isRepeating: true,
            },
        ];
    }
}
