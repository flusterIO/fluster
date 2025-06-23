import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { fsFileExtensionGlob } from "@/lib/fs_glob";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";
import { getPdfUrl } from "#/pdf/data/utils/get_pdf_url";
import { NavigateFunction } from "react-router";
import store from "@/state/store";
import { AppState } from "@/state/initial_state";

export class PdfFilesCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Pdf's", "pdfs");
    }
    filterByLocation(): boolean {
        return true;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        const res = await fsFileExtensionGlob("pdf");
        const notesDir = (store.getState() as AppState).core.notesDirectory ?? "";
        return res.map((s) => {
            const item = new GeneralCommandPaletteItem(
                notesDir.length && s.startsWith(notesDir) ? s.replace(notesDir, "") : s,
                `pdf-${s}`,
                async (nav: NavigateFunction) => {
                    nav(getPdfUrl(s));
                }
            );
            item.itemClasses = "text-sm";
            return item;
        });
    }
}
