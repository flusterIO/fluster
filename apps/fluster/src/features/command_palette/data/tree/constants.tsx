import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";
import React, { ReactNode } from "react";
import { Constants, showToast } from "@fluster.io/dev";
import { copyStringToClipboard } from "@/lib/copy_string_to_clipboard";

export class ConstantsCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Constants", "cmd-palette-constants");
    }
    filterByLocation(): boolean {
        return true;
    }
    bottomBar(): ReactNode {
        return (
            <div className="text-sm text-muted-foreground w-full flex flex-row justify-end items-center">
                cmd+Enter to copy the value
            </div>
        );
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        return Object.entries(new Constants()).map((c) => {
            return new GeneralCommandPaletteItem(
                c[1].label,
                `constant-${c[0]}`,
                async () => {
                    const res = await copyStringToClipboard(c[0]);
                    if (res) {
                        showToast({
                            title: "Success",
                            body: `${c[0]} was copied to your clipboard.`,
                            variant: "Success",
                            duration: 3000,
                        });
                    }
                },
                async () => {
                    const res = await copyStringToClipboard(c[1].value);
                    if (res) {
                        showToast({
                            title: "Success",
                            body: `This value of ${c[1].label} was copied to your clipboard.`,
                            variant: "Success",
                            duration: 3000,
                        });
                    }
                }
            );
        });
    }
}
