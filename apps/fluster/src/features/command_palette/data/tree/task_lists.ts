import { AppRoutes } from "#/router/data/app_routes";
import { commands } from "@/lib/bindings";
import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";

export class TaskListsCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Task Lists", "task-lists");
    }
    filterByLocation(): boolean {
        return true;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        const res = await commands.getAllTaskLists();
        if (res.status === "error") {
            console.error("An error occurred while gathering task lists.");
            return [];
        }
        return res.data.map((k) => {
            return new GeneralCommandPaletteItem(k.label, k.id, async (nav) => {
                const sp = new URLSearchParams();
                sp.set("listId", k.id);
                nav(`${AppRoutes.taskLists}?${sp.toString()}`);
            });
        });
    }
}
