import { Button } from "@/components/ui/button"; // use your own implementation
import { FormControl, FormItem, FormLabel } from "@/components/ui/form"; // use your own implementation
import { Input } from "@/components/ui/input"; // use your own implementation
import { LexicalEditor } from "lexical";
import * as React from "react";
import { INSERT_GRID_COMMAND } from "./grid-plugin";

type InsertGridDialogProps = {
    activeEditor: LexicalEditor;
    onClose: () => void;
};

export const InsertGridDialog: React.FC<InsertGridDialogProps> = ({
    activeEditor,
    onClose,
}) => {
    const [rows, setRows] = React.useState("1");
    const [columns, setColumns] = React.useState("2");
    const [isDisabled, setIsDisabled] = React.useState(true);

    React.useEffect(() => {
        const row = Number(rows);
        const column = Number(columns);
        if (row && row > 0 && row <= 4 && column && column > 0 && column <= 4) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [rows, columns]);

    const handleSubmit = React.useCallback(() => {
        activeEditor.dispatchCommand(INSERT_GRID_COMMAND, {
            columns: Number(columns),
            rows: Number(rows),
        });

        onClose();
    }, [activeEditor, columns, onClose, rows]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormItem>
                <FormLabel>Rows</FormLabel>
                <FormControl>
                    <Input
                        placeholder={"# of rows (1-4)"}
                        min={1}
                        max={4}
                        onChange={(e) => setRows(e.target.value)}
                        value={rows}
                        type="number"
                    />
                </FormControl>
            </FormItem>
            <FormItem>
                <FormLabel>Columns</FormLabel>
                <FormControl>
                    <Input
                        placeholder={"# of columns (1-4)"}
                        min={1}
                        max={4}
                        onChange={(e) => setColumns(e.target.value)}
                        value={columns}
                        type="number"
                    />
                </FormControl>
            </FormItem>
            <div className="flex justify-end">
                <Button disabled={isDisabled}>Guardar</Button>
            </div>
        </form>
    );
};
