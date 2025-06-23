import { AppRoutes } from "#/router/data/app_routes";
import { commands } from "@/lib/bindings";
import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";

export class AiChatsCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("AI Chats", "ai-chats");
    }
    filterByLocation(): boolean {
        return true;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        const res = await commands.getAllAiChats();
        if (res.status === "error") {
            console.error("An error occurred while gathering your ai chat history");
            return [];
        }
        return res.data.map((k) => {
            return new GeneralCommandPaletteItem(k.label, k.id, async (nav) => {
                const sp = new URLSearchParams();
                sp.set("chat_id", k.id);
                return nav(`${AppRoutes.aiMainChat}?${sp.toString()}`);
            });
        });
    }
}
