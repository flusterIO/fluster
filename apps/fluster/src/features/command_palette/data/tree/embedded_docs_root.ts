import { embeddedDocLabels } from "#/embedded_docs/data/embedded_docs_entries";
import { AppRoutes } from "#/router/data/app_routes";
import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";
import { ComponentDocsCommandPaletteRoot } from "./component_docs";

export class EmbeddedDocsCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Documentation", "cmd-palette-docs");
    }
    filterByLocation(): boolean {
        return true;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        const items: CommandPaletteAnyEntry[] = Object.entries(
            embeddedDocLabels
        ).map((k) => {
            return new GeneralCommandPaletteItem(k[1], k[1], async (nav) => {
                nav(`${AppRoutes.embeddedDocs.toString()}/${encodeURI(k[0])}`);
            });
        });

        items.push(new ComponentDocsCommandPaletteRoot());
        return items;
    }
}
