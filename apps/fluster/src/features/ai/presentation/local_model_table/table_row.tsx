import { LocalModelData } from "@/lib/bindings";
import { cn, TableCell, TableRow } from "@fluster.io/dev";
import { flexRender, Row } from "@tanstack/react-table";
import React, { useMemo, type ReactNode } from "react";
import { LocalModelTableColId } from "./columns";

interface LocalModelTableRowProps {
  row: Row<LocalModelData>;
  setOnClick?: (modelName: string) => void;
  activeModelName?: string;
}

export const LocalModelTableRow = ({
  row,
  setOnClick,
  activeModelName,
}: LocalModelTableRowProps): ReactNode => {
  console.log("setOnClick: ", setOnClick);
  const active = useMemo(() => {
    return activeModelName === row.getValue(LocalModelTableColId.name);
  }, [row, activeModelName]);
  return (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      className={cn(
        setOnClick && "cursor-pointer",
        active &&
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground transition-colors duration-300"
      )}
      onClick={() => {
        if (setOnClick) {
          setOnClick(row.getValue(LocalModelTableColId.name) as string);
        }
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

LocalModelTableRow.displayName = "LocalModelTableRow";
