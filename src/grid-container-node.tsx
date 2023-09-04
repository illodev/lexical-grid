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

type SerializedGridColumnNode = Spread<
    {
        span: number;
    },
    SerializedElementNode
>;

export function convertGridColumnElement(
    domNode: HTMLDivElement
): DOMConversionOutput | null {
    const node = $createGridColumnNode(
        Number(domNode.getAttribute("data-span"))
    );

    return {
        node,
    };
}

export class GridColumnNode extends ElementNode {
    __span: number = 1;

    constructor(span: number, key?: NodeKey) {
        super(key);
        this.__span = span;
    }

    static getType(): string {
        return "grid-column";
    }

    static clone(node: GridColumnNode): GridColumnNode {
        return new GridColumnNode(node.__span, node.__key);
    }

    createDOM(config: EditorConfig, editor: LexicalEditor): HTMLElement {
        const dom = document.createElement("div");
        dom.classList.add("Grid__column");
        dom.setAttribute("data-type", "grid-column");
        dom.setAttribute("data-span", this.__span.toString());
        dom.style.gridColumn = `span ${this.__span}`;

        return dom;
    }

    updateDOM(
        prevNode: GridColumnNode,
        dom: HTMLDivElement
    ): boolean {
        if (prevNode.__span !== this.__span) {
            dom.setAttribute("data-span", this.__span.toString());
        }

        return false;
    }

    static importDOM(): DOMConversionMap<HTMLDivElement> | null {
        return {
            div: (domNode: HTMLDivElement) => {
                if (domNode.getAttribute("data-type") !== "grid-column") {
                    return null;
                }

                return {
                    conversion: convertGridColumnElement,
                    priority: 1,
                };
            },
        };
    }

    static importJSON(
        serializedNode: SerializedGridColumnNode
    ): GridColumnNode {
        const node = $createGridColumnNode(serializedNode.span);
        return node;
    }

    exportDOM(): DOMExportOutput {
        const element = document.createElement("div");
        element.setAttribute("data-type", "grid-column");
        element.setAttribute("data-span", this.__span.toString());
        element.style.gridColumn = `span ${this.__span}`;

        return { element };
    }

    exportJSON(): SerializedGridColumnNode {
        return {
            ...super.exportJSON(),
            span: this.__span,
            type: "grid-column",
            version: 1,
        };
    }
}

export function $createGridColumnNode(
    span: number = 1
): GridColumnNode {
    return new GridColumnNode(
        Number(span)
    );
}

export function $isGridColumnNode(
    node: LexicalNode | null | undefined
): node is GridColumnNode {
    return node instanceof GridColumnNode;
}
