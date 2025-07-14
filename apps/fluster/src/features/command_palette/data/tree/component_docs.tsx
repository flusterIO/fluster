import { AppRoutes } from "#/router/data/app_routes";
import { NavigateFunction } from "react-router";
import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { componentDocItems } from "#/embedded_docs/data/component_docs";
import { ReactNode } from "react";
import { ComponentDocsPreview } from "#/command_palette/presentation/previews/component_docs_preview";
import { CommandPaletteEntryWithPreview } from "../models/command_palette_entry_with_preview";

export class ComponentDocsCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Components", "cmd-palette-component-docs", ComponentDocsPreview);
    }
    filterByLocation(): boolean {
        return true;
    }
    bottomBar(): ReactNode {
        return null;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        return componentDocItems.map((c) => {
            return new CommandPaletteEntryWithPreview(
                c.label,
                `component-${c.fp}`,
                async (nav: NavigateFunction) => {
                    const sp = new URLSearchParams();
                    sp.set("fsPath", c.fp);
                    nav(`${AppRoutes.embeddedDocs}?${sp.toString()}`);
                },
                null,
                c.fp
            );
        });
    }
}
