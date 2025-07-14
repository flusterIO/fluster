import { GeneralCommandPaletteItem, InvokeFunc } from "./command_palette_item";

export class CommandPaletteEntryWithPreview extends GeneralCommandPaletteItem {
    previewPath: string;
    constructor(
        label: string,
        id: string,
        invoke: InvokeFunc,
        onCmdEnter: InvokeFunc | null,
        previewPath: string
    ) {
        super(label, id, invoke, onCmdEnter ?? undefined);
        this.previewPath = previewPath;
    }
}
