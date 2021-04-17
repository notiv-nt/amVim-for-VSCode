import { TextEditorRevealType } from 'vscode';
import { StaticReflect } from '../LanguageExtensions/StaticReflect';
import { SymbolMetadata } from '../Symbols/Metadata';
import { Mode, ModeID } from './Mode';
import { Configuration } from '../Configuration';
import { CommandMap } from '../Mappers/Command';
import { ActionUnderlineCursor } from '../Actions/UnderlineCursor';
import { ActionRelativeLineNumbers } from '../Actions/RelativeLineNumbers';
import { ActionMoveCursor } from '../Actions/MoveCursor';
import { ActionPage } from '../Actions/Page';
import { ActionInsert } from '../Actions/Insert';
import { ActionDelete } from '../Actions/Delete';
import { ActionReplace } from '../Actions/Replace';
import { ActionCase } from '../Actions/Case';
import { ActionRegister } from '../Actions/Register';
import { ActionReveal } from '../Actions/Reveal';
import { ActionNativeEscape } from '../Actions/NativeEscape';
import { ActionJoinLines } from '../Actions/JoinLines';
import { ActionFind } from '../Actions/Find';
import { ActionSelection } from '../Actions/Selection';
import { ActionHistory } from '../Actions/History';
import { ActionIndent } from '../Actions/Indent';
import { ActionFilter } from '../Actions/Filter';
import { ActionMode } from '../Actions/Mode';
import { ActionFold } from '../Actions/Fold';
import { ActionCommandLine } from '../Actions/CommandLine';
import { MotionCharacter } from '../Motions/Character';
import { MotionLine } from '../Motions/Line';

export class ModeNormal extends Mode {
    id = ModeID.NORMAL;
    name = 'NORMAL';

    private maps: CommandMap[] = [
        {
            keys: '{motion}',
            actions: [ActionMoveCursor.byMotions],
            args: { noEmptyAtLineEnd: true },
        },

        // {
        //     keys: '{N} {motion}',
        //     actions: [ActionMoveCursor.byMotions],
        //     args: { noEmptyAtLineEnd: true },
        // },

        // { keys: 'ctrl+b', actions: [ActionPage.up] },
        // { keys: 'ctrl+f', actions: [ActionPage.down] },

        { keys: 'c', actions: [ActionMode.toInsert] },
        // {
        //     keys: 'I',
        //     actions: [
        //         () =>
        //             ActionMoveCursor.byMotions({
        //                 motions: [MotionLine.firstNonBlank()],
        //             }),
        //         ActionMode.toInsert,
        //     ],
        // },
        {
            keys: 'z',
            actions: [
                () =>
                    ActionMoveCursor.byMotions({
                        motions: [MotionLine.start()],
                    }),
                ActionMode.toInsert,
            ],
        },
        {
            keys: 'Ω',
            actions: [
                () =>
                    ActionMoveCursor.byMotions({
                        motions: [MotionLine.start()],
                    }),
                ActionMode.toInsert,
            ],
        },
        {
            keys: 'a',
            actions: [
                () =>
                    ActionMoveCursor.byMotions({
                        motions: [MotionCharacter.right()],
                    }),
                ActionMode.toInsert,
            ],
        },
        // {
        //     keys: 'A',
        //     actions: [
        //         () => ActionMoveCursor.byMotions({ motions: [MotionLine.end()] }),
        //         ActionMode.toInsert,
        //     ],
        // },
        {
            keys: 's',
            actions: [
                () => ActionMoveCursor.byMotions({ motions: [MotionLine.end()] }),
                ActionMode.toInsert,
            ],
        },
        {
            keys: 'ß',
            actions: [
                () => ActionMoveCursor.byMotions({ motions: [MotionLine.end()] }),
                ActionMode.toInsert,
            ],
        },

        {
            keys: 'r',
            actions: [ActionInsert.newLineAfter, ActionMode.toInsert],
        },
        {
            keys: 'R',
            actions: [ActionInsert.newLineBefore, ActionMode.toInsert],
        },

        {
            keys: 'o',
            actions: [ActionDelete.selectionsOrRight, ActionMode.toInsert],
            args: {
                shouldYank: true,
            },
        },

        {
            keys: 'Q',
            actions: [ActionDelete.selectionsOrLeft],
            args: { shouldYank: true },
        },
        // {
        //     keys: '{N} X',
        //     actions: [ActionDelete.selectionsOrLeft],
        //     args: { shouldYank: true },
        // },
        {
            keys: 'q',
            actions: [ActionDelete.selectionsOrRight, ActionSelection.validateSelections],
            args: {
                shouldYank: true,
            },
        },
        // {
        //     keys: '{N} x',
        //     actions: [ActionDelete.selectionsOrRight, ActionSelection.validateSelections],
        //     args: {
        //         shouldYank: true,
        //     },
        // },
        // {
        //     keys: 'delete',
        //     actions: [ActionDelete.selectionsOrRight, ActionSelection.validateSelections],
        //     args: {
        //         shouldYank: true,
        //     },
        // },
        {
            keys: 'e',
            actions: [ActionDelete.byLines],
            args: { shouldYank: true },
        },
        // {
        //     keys: '{N} d d',
        //     actions: [ActionDelete.byLines],
        //     args: { shouldYank: true },
        // },
        // {
        //     keys: 'd {N} d',
        //     actions: [ActionDelete.byLines],
        //     args: { shouldYank: true },
        // },
        // {
        //     keys: 'D',
        //     actions: [ActionDelete.byMotions, ActionSelection.validateSelections],
        //     args: {
        //         motions: [MotionLine.end()],
        //         shouldYank: true,
        //     },
        // },
        // {
        //     keys: 'd {motion}',
        //     actions: [ActionDelete.byMotions, ActionSelection.validateSelections],
        //     args: {
        //         shouldYank: true,
        //     },
        // },
        // {
        //     keys: 'd {N} {motion}',
        //     actions: [ActionDelete.byMotions, ActionSelection.validateSelections],
        //     args: {
        //         shouldYank: true,
        //     },
        // },
        // {
        //     keys: '{N} d {motion}',
        //     actions: [ActionDelete.byMotions, ActionSelection.validateSelections],
        //     args: {
        //         shouldYank: true,
        //     },
        // },
        // {
        //     keys: 'd {textObject}',
        //     actions: [ActionDelete.byTextObject, ActionSelection.validateSelections],
        //     args: {
        //         shouldYank: true,
        //     },
        // },
        {
            keys: 'J',
            actions: [ActionDelete.byMotions, ActionMode.toInsert],
            args: {
                motions: [MotionLine.end()],
                shouldYank: true,
            },
        },
        // {
        //     keys: 'c c',
        //     actions: [
        //         () =>
        //             ActionMoveCursor.byMotions({
        //                 motions: [MotionLine.firstNonBlank()],
        //             }),
        //         ActionDelete.byMotions,
        //         ActionMode.toInsert,
        //     ],
        //     args: {
        //         motions: [MotionLine.end()],
        //         shouldYank: true,
        //     },
        // },
        // {
        //     keys: 'S',
        //     actions: [
        //         () =>
        //             ActionMoveCursor.byMotions({
        //                 motions: [MotionLine.firstNonBlank()],
        //             }),
        //         ActionDelete.byMotions,
        //         ActionMode.toInsert,
        //     ],
        //     args: {
        //         motions: [MotionLine.end()],
        //         shouldYank: true,
        //     },
        // },
        // {
        //     keys: 'c {motion}',
        //     actions: [ActionDelete.byMotions, ActionMode.toInsert],
        //     args: {
        //         shouldYank: true,
        //         isChangeAction: true,
        //     },
        // },
        // {
        //     keys: 'c {N} {motion}',
        //     actions: [ActionDelete.byMotions, ActionMode.toInsert],
        //     args: {
        //         shouldYank: true,
        //         isChangeAction: true,
        //     },
        // },
        // {
        //     keys: 'c {textObject}',
        //     actions: [ActionDelete.byTextObject, ActionMode.toInsert],
        //     args: {
        //         shouldYank: true,
        //     },
        // },
        { keys: 'D', actions: [ActionJoinLines.onSelections] },

        { keys: 'p {char}', actions: [ActionReplace.charactersWithCharacter] },
        // { keys: '{N} r {char}', actions: [ActionReplace.charactersWithCharacter] },
        // { keys: 'R', actions: [ActionMode.toReplace] },

        {
            keys: '3',
            actions: [
                ActionCase.switchActives,
                () =>
                    ActionMoveCursor.byMotions({
                        motions: [MotionCharacter.right()],
                    }),
            ],
        },
        // {
        //     keys: '{N} ~',
        //     actions: [
        //         ActionCase.switchActives,
        //         (n) =>
        //             ActionMoveCursor.byMotions({
        //                 motions: [MotionCharacter.right(n)],
        //             }),
        //     ],
        // },

        { keys: 'f', actions: [ActionRegister.yankLines] },
        // { keys: '{N} y y', actions: [ActionRegister.yankLines] },
        // { keys: 'y {N} y', actions: [ActionRegister.yankLines] },
        // { keys: 'Y', actions: [ActionRegister.yankLines] },
        // { keys: 'y {motion}', actions: [ActionRegister.yankByMotions] },
        // { keys: 'y {N} {motion}', actions: [ActionRegister.yankByMotions] },
        // { keys: 'y {textObject}', actions: [ActionRegister.yankByTextObject] },
        { keys: 'l', actions: [ActionRegister.putAfter] },
        // { keys: '{N} p', actions: [ActionRegister.putAfter] },
        { keys: 'L', actions: [ActionRegister.putBefore] },
        // { keys: '{N} P', actions: [ActionRegister.putBefore] },

        { keys: '8', actions: [ActionFind.prev] },
        { keys: '9', actions: [ActionFind.next] },
        // { keys: '*', actions: [ActionFind.byIndicator, ActionFind.next] },
        // { keys: '#', actions: [ActionFind.byIndicator, ActionFind.prev] },

        // { keys: '= {motion}', actions: [ActionFilter.Format.byMotions] },
        // { keys: '= {N} {motion}', actions: [ActionFilter.Format.byMotions] },
        // { keys: '= =', actions: [ActionFilter.Format.byCursors] },

        // {
        //     keys: 'u',
        //     actions: [ActionHistory.undo, ActionSelection.validateSelections],
        // },
        // {
        //     keys: 'ctrl+r',
        //     actions: [ActionHistory.redo, ActionSelection.validateSelections],
        // },

        // { keys: '< <', actions: [ActionIndent.decrease] },
        // { keys: '> >', actions: [ActionIndent.increase] },

        { keys: '/', actions: [ActionFind.focusFindWidget] },

        { keys: 'k', actions: [ActionMode.toVisual] },
        { keys: 'K', actions: [ActionMode.toVisualLine] },

        {
            keys: '`',
            actions: [ActionReveal.primaryCursor],
            args: { revealType: TextEditorRevealType.InCenter },
        },
        {
            keys: ';',
            actions: [ActionReveal.primaryCursor],
            args: { revealType: TextEditorRevealType.InCenter },
        },

        // {
        //     keys: 'j',
        //     actions: [ActionReveal.primaryCursor],
        //     args: { revealType: TextEditorRevealType.AtTop },
        // },
        // { keys: 'z c', actions: [ActionFold.fold] },
        // { keys: 'z o', actions: [ActionFold.unfold] },
        // { keys: 'z M', actions: [ActionFold.foldAll] },
        // { keys: 'z R', actions: [ActionFold.unfoldAll] },

        // { keys: ':', actions: [ActionCommandLine.promptAndRun] },

        // { keys: '.', actions: [this.repeatRecordedCommandMaps.bind(this)] },

        // {
        //     keys: 'ctrl+c',
        //     actions: [ActionNativeEscape.press, ActionSelection.shrinkToPrimaryActive],
        // },
        // {
        //     keys: 'ctrl+[',
        //     actions: [ActionNativeEscape.press, ActionSelection.shrinkToPrimaryActive],
        // },
        {
            keys: 'escape',
            actions: [ActionNativeEscape.press, ActionSelection.shrinkToPrimaryActive],
        },
        {
            keys: 'space',
            actions: [ActionInsert.space],
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

        ActionUnderlineCursor.on();

        if (Configuration.smartRelativeLineNumbers) {
            ActionRelativeLineNumbers.on();
        }
    }

    exit(): void {
        super.exit();

        ActionUnderlineCursor.off();
    }

    private _recordedCommandMaps: CommandMap[];
    get recordedCommandMaps() {
        return this._recordedCommandMaps;
    }

    protected onWillCommandMapMakesChanges(map: CommandMap): Promise<boolean> {
        if (map.isRepeating) {
            return Promise.resolve(false);
        }

        const actions = map.actions.filter((action) => {
            return (
                StaticReflect.getMetadata(SymbolMetadata.Action.shouldSkipOnRepeat, action) !== true
            );
        });

        this._recordedCommandMaps = [
            {
                keys: map.keys,
                actions: actions,
                args: map.args,
                isRepeating: true,
            },
        ];

        return Promise.resolve(true);
    }

    onDidRecordFinish(recordedCommandMaps: CommandMap[], lastModeID: ModeID): void {
        if (!recordedCommandMaps || recordedCommandMaps.length === 0) {
            return;
        }

        if (lastModeID === ModeID.INSERT || lastModeID === ModeID.REPLACE) {
            recordedCommandMaps.forEach((map) => (map.isRepeating = true));

            if (this._recordedCommandMaps === undefined) {
                this._recordedCommandMaps = recordedCommandMaps;
            } else {
                this._recordedCommandMaps = this._recordedCommandMaps.concat(recordedCommandMaps);
            }
        } else {
            this._recordedCommandMaps = recordedCommandMaps;
        }
    }

    private repeatRecordedCommandMaps(): Thenable<boolean> {
        if (this._recordedCommandMaps === undefined) {
            return Promise.resolve(false);
        }

        // TODO: Replace `args.n` if provided

        this._recordedCommandMaps.forEach((map) => this.pushCommandMap(map));
        this.pushCommandMap({
            keys: 'escape',
            actions: [ActionNativeEscape.press],
        });
        this.execute();

        return Promise.resolve(true);
    }
}
