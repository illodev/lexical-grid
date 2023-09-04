import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodeToNearestRoot, mergeRegister } from "@lexical/utils";
import {
    $createParagraphNode,
    COMMAND_PRIORITY_LOW,
    ElementNode,
    LexicalCommand,
    LexicalNode,
    createCommand,
} from "lexical";
import { useEffect } from "react";
import { $createGridColumnNode, GridColumnNode } from "./grid-column-node";
import {
    $createGridContainerNode,
    $isGridContainerNode,
    GridContainerNode,
} from "./grid-container-node";
import {
    $createGridRowNode,
    $isGridRowNode,
    GridRowNode,
} from "./grid-row-node";
import { loadPresetCommand } from "./presets";

export type InsertGridCommandPayload = Readonly<{
    columns: number;
    rows: number;
}>;

export const INSERT_GRID_COMMAND: LexicalCommand<InsertGridCommandPayload> =
    createCommand("INSERT_GRID_COMMAND");

export default function GridPlugin(): null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (
            !editor.hasNodes([GridContainerNode, GridRowNode, GridColumnNode])
        ) {
            throw new Error(
                "CollapsiblePlugin: GridContainerNode, GridRowNode, or GridColumnNode not registered on editor"
            );
        }

        return mergeRegister(
            editor.registerNodeTransform(GridColumnNode, (node) => {
                const parent = node.getParent<ElementNode>();
                if (!$isGridRowNode(parent)) {
                    const children = node.getChildren<LexicalNode>();
                    for (const child of children) {
                        node.insertBefore(child);
                    }
                    node.remove();
                }
            }),
            editor.registerNodeTransform(GridRowNode, (node) => {
                const parent = node.getParent<ElementNode>();
                if (!$isGridContainerNode(parent)) {
                    node.replace(
                        $createParagraphNode().append(
                            ...node.getChildren<LexicalNode>()
                        )
                    );
                    return;
                }
            }),
            editor.registerCommand<InsertGridCommandPayload>(
                INSERT_GRID_COMMAND,
                (payload) => {
                    editor.update(() => {
                        const container = $createGridContainerNode();
                        Array.from({ length: payload.rows }).forEach(() => {
                            const row = $createGridRowNode();
                            Array.from({ length: payload.columns }).forEach(
                                () => {
                                    row.append(
                                        $createGridColumnNode().append(
                                            $createParagraphNode()
                                        )
                                    );
                                }
                            );
                            container.append(row);
                        });

                        $insertNodeToNearestRoot(container);

                        container.select();
                    });

                    return true;
                },
                COMMAND_PRIORITY_LOW
            ),
            loadPresetCommand(editor) // optional
        );
    }, [editor]);

    return null;
}
