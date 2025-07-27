import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";
import { ReactNode } from "react";
import { AppRoutes, showToast } from "@fluster.io/dev";
import { commands } from "@/lib/bindings";
import { getMaxPagination } from "@/lib/max_pagination";

export class CitationsCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Citations", "cmd-palette-citations");
    }
    filterByLocation(): boolean {
        return true;
    }
    bottomBar(): ReactNode {
        return null;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        const items = await commands.getBibEntries(null, getMaxPagination());

        if (items.status === "ok") {
            return items.data.map((d) => {
                return new GeneralCommandPaletteItem(
                    d.html_citation,
                    d.id,
                    async (nav) => {
                        const sp = new URLSearchParams();
                        sp.set("by_bib", d.id);
                        nav(`${AppRoutes.search}?${sp.toString()}`);
                    },
                    undefined,
                    true
                );
            });
        } else {
            showToast({
                title: "Uh Oh.",
                body: "Something went wrong while searching by citation. Do you have a .bib file configured in your settings?",
                duration: 5000,
                variant: "Error",
            });
            return [];
        }
    }
}
