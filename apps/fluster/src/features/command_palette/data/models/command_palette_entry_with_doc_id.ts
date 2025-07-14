import { InternalEmbeddedDocsId } from "@/lib/bindings";
import { GeneralCommandPaletteItem, InvokeFunc } from "./command_palette_item";

export class CommandPaletteEntryWithDocId extends GeneralCommandPaletteItem {
    docId: InternalEmbeddedDocsId;
    constructor(
        label: string,
        id: string,
        invoke: InvokeFunc,
        onCmdEnter: InvokeFunc | null,
        docId: InternalEmbeddedDocsId
    ) {
        super(label, id, invoke, onCmdEnter ?? undefined);
        this.docId = docId;
    }
}
