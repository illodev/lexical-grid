import {
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    EditorConfig,
    ElementNode,
    LexicalEditor,
    LexicalNode,
    NodeKey,
    SerializedElementNode,
    Spread,
} from "lexical";

type SerializedGridRowNode = Spread<
    {},
    SerializedElementNode
>;

export function convertGridRowElement(
    domNode: HTMLDivElement
): DOMConversionOutput | null {
    const node = $createGridRowNode();

    return {
        node,
    };
}

export class GridRowNode extends ElementNode {
    constructor(key?: NodeKey) {
        super(key);
    }

    static getType(): string {
        return "grid-row";
    }

    static clone(node: GridRowNode): GridRowNode {
        return new GridRowNode(node.__key);
    }

    createDOM(config: EditorConfig, editor: LexicalEditor): HTMLElement {
        const dom = document.createElement("div");
        dom.classList.add("Grid__row");
        dom.setAttribute("data-type", "grid-row");

        return dom;
    }

    updateDOM(
        prevNode: GridRowNode,
        dom: HTMLDivElement
    ): boolean {
        return false;
    }

    static importDOM(): DOMConversionMap<HTMLDivElement> | null {
        return {
            div: (domNode: HTMLDivElement) => {
                if (domNode.getAttribute("data-type") !== "grid-row") {
                    return null;
                }

                return {
                    conversion: convertGridRowElement,
                    priority: 1,
                };
            },
        };
    }

    static importJSON(
        serializedNode: SerializedGridRowNode
    ): GridRowNode {
        const node = $createGridRowNode();
        return node;
    }

    exportDOM(): DOMExportOutput {
        const element = document.createElement("div");
        element.setAttribute("data-type", "grid-row");
        return { element };
    }

    exportJSON(): SerializedGridRowNode {
        return {
            ...super.exportJSON(),
            type: "grid-row",
            version: 1,
        };
    }
}

export function $createGridRowNode(): GridRowNode {
    return new GridRowNode();
}

export function $isGridRowNode(
    node: LexicalNode | null | undefined
): node is GridRowNode {
    return node instanceof GridRowNode;
}
