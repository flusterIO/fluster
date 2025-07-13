import { CommandPaletteAnyEntry } from "#/command_palette/data/models/command_palette_any_entry";
import React, { ReactNode } from "react";

export const ComponentDocsPreview = ({
    item,
}: {
    item: CommandPaletteAnyEntry;
}): ReactNode => {
    return <div>{item.label}</div>;
};
