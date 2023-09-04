# lexical-grid

Grid plugin for Lexical @lexical/react

## How to use

Add the plugin to the editor

```ts
const Nodes: Array<Klass<LexicalNode>> = [
    ..., // other nodes
    GridContainerNode,
    GridRowNode,
    GridColumnNode,
];

export default Nodes;
```

Add the plugin to the editor

```tsx
return () => <GridPlugin />;
```

## Example

```tsx
return () => (
    <Button
        onClick={() => {
            showModal("Añadir grid", (onClose) => (
                <InsertGridDialog
                    activeEditor={activeEditor}
                    onClose={onClose}
                />
            ));
        }}
    >
        <PlusCircledIcon className="mr-2 h-5 w-5" />
        Add grid
    </Button>
);
```

