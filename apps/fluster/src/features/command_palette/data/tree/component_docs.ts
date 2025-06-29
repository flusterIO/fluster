import { AppRoutes } from "#/router/data/app_routes";
import { NavigateFunction } from "react-router";
import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";
import { componentDocItems } from "#/embedded_docs/data/component_docs";

export class ComponentDocsCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Components", "cmd-palette-component-docs");
    }
    filterByLocation(): boolean {
        return true;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        return componentDocItems.map((c) => {
            return new GeneralCommandPaletteItem(
                c.label,
                `component-${c.fp}`,
                async (nav: NavigateFunction) => {
                    const sp = new URLSearchParams();
                    sp.set("fsPath", c.fp);
                    nav(`${AppRoutes.embeddedDocs}?${sp.toString()}`);
                }
            );
        });
    }
}
