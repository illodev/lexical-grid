import { $insertNodeToNearestRoot } from "@lexical/utils";
import {
    $createParagraphNode,
    $createTextNode,
    COMMAND_PRIORITY_LOW,
    LexicalCommand,
    LexicalEditor,
    ParagraphNode,
    createCommand,
} from "lexical";
import { $createImageNode, ImageNode } from "../image-plugin/image-node";
import { $createGridColumnNode } from "./grid-column-node";
import { $createGridContainerNode } from "./grid-container-node";
import { $createGridRowNode } from "./grid-row-node";

type PresetColumn = {
    span: number;
    content?: () => ParagraphNode | ImageNode;
};

type PresetRow = {
    columns: Array<PresetColumn>;
};

export type InsertGridPresetCommandPayload = Readonly<{
    name?: string;
    rows: Array<PresetRow>;
}>;

export const presets: Array<InsertGridPresetCommandPayload> = [
    {
        name: "1",
        rows: [
            {
                columns: [
                    {
                        span: 1,
                        content: () =>
                            $createParagraphNode().append(
                                $createTextNode(
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget hendrerit tellus. Sed vel libero a nunc tincidunt tincidunt. In ut laoreet quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras laoreet bibendum justo, nec feugiat odio posuere non. In hac habitasse platea dictumst. Fusce vitae sollicitudin nunc. Phasellus vel velit felis."
                                )
                            ),
                    },
                ],
            },
        ],
    },
    {
        name: "1/1",
        rows: [
            {
                columns: [
                    {
                        span: 1,
                        content: () =>
                            $createParagraphNode().append(
                                $createTextNode(
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget hendrerit tellus. Sed vel libero a nunc tincidunt tincidunt. In ut laoreet quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras laoreet bibendum justo, nec feugiat odio posuere non. In hac habitasse platea dictumst. Fusce vitae sollicitudin nunc. Phasellus vel velit felis."
                                )
                            ),
                    },
                    {
                        span: 1,
                        content: () =>
                            $createParagraphNode().append(
                                $createTextNode(
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget hendrerit tellus. Sed vel libero a nunc tincidunt tincidunt. In ut laoreet quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras laoreet bibendum justo, nec feugiat odio posuere non. In hac habitasse platea dictumst. Fusce vitae sollicitudin nunc. Phasellus vel velit felis."
                                )
                            ),
                    },
                ],
            },
        ],
    },
    {
        name: "1/2",
        rows: [
            {
                columns: [
                    {
                        span: 1,
                        content: () =>
                            $createImageNode({
                                src: "https://picsum.photos/200",
                                altText: "Image",
                            }),
                    },
                    {
                        span: 2,
                        content: () =>
                            $createParagraphNode().append(
                                $createTextNode(
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget hendrerit tellus. Sed vel libero a nunc tincidunt tincidunt. In ut laoreet quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras laoreet bibendum justo, nec feugiat odio posuere non. In hac habitasse platea dictumst. Fusce vitae sollicitudin nunc. Phasellus vel velit felis."
                                )
                            ),
                    },
                ],
            },
        ],
    },
    {
        name: "2/1",
        rows: [
            {
                columns: [
                    {
                        span: 2,
                        content: () =>
                            $createParagraphNode().append(
                                $createTextNode(
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget hendrerit tellus. Sed vel libero a nunc tincidunt tincidunt. In ut laoreet quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras laoreet bibendum justo, nec feugiat odio posuere non. In hac habitasse platea dictumst. Fusce vitae sollicitudin nunc. Phasellus vel velit felis."
                                )
                            ),
                    },
                    {
                        span: 1,
                        content: () =>
                            $createImageNode({
                                src: "https://picsum.photos/200",
                                altText: "Image",
                            }),
                    },
                ],
            },
        ],
    },
];

export const INSERT_GRID_PRESET_COMMAND: LexicalCommand<InsertGridPresetCommandPayload> =
    createCommand("INSERT_GRID_PRESET_COMMAND");

export const loadPresetCommand = (editor: LexicalEditor) =>
    editor.registerCommand<InsertGridPresetCommandPayload>(
        INSERT_GRID_PRESET_COMMAND,
        (payload) => {
            editor.update(() => {
                const container = $createGridContainerNode();

                payload.rows.forEach((row) => {
                    const gridRow = $createGridRowNode();
                    row.columns.forEach((column) => {
                        gridRow.append(
                            $createGridColumnNode(column.span).append(
                                column.content?.() ?? $createParagraphNode()
                            )
                        );
                    });
                    container.append(gridRow);
                });

                $insertNodeToNearestRoot(container);
            });

            return true;
        },
        COMMAND_PRIORITY_LOW
    );

// Example of a command palette for presets
//
// <Command className="rounded-lg border">
//     <CommandInput placeholder="Search presets..." />
//     <CommandList className="max-h-full">
//         <CommandEmpty>No presets found.</CommandEmpty>
//         <CommandGroup heading="Presets">
//             {presets.map((preset) => (
//                 <CommandItem
//                     key={preset.name}
//                     onSelect={() => {
//                         activeEditor.dispatchCommand(
//                             INSERT_GRID_PRESET_COMMAND,
//                             preset
//                         );
//                     }}
//                 >
//                     <div className="w-full flex flex-col">
//                         <div className="text-xs text-muted-foreground">
//                             {preset.name}
//                         </div>
//                         {preset.rows.map((row, rowIndex) => (
//                             <div
//                                 key={rowIndex}
//                                 className="w-full grid grid-flow-col auto-cols-fr gap-1"
//                             >
//                                 {row.columns.map((col, colIdx) => (
//                                     <Skeleton
//                                         key={colIdx}
//                                         className="h-10 animate-none rounded-lg"
//                                         style={{
//                                             gridColumn: `span ${col.span}`,
//                                         }}
//                                     />
//                                 ))}
//                             </div>
//                         ))}
//                     </div>
//                 </CommandItem>
//             ))}
//         </CommandGroup>
//     </CommandList>
// </Command>
