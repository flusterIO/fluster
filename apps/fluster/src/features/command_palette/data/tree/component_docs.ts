import { AppRoutes } from "#/router/data/app_routes";
import { NavigateFunction } from "react-router";
import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";

interface ComponentDocsEntry {
    label: string;
    /// The file path relative to docs/embbedded.
    fp: string;
}

const componentDocs: ComponentDocsEntry[] = [
    {
        label: "Admonition",
        fp: "component_docs/admonition.mdx",
    },
];

export class ComponentDocsCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Components", "cmd-palette-component-docs");
    }
    filterByLocation(): boolean {
        return true;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        return componentDocs.map((c) => {
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
