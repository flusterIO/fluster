import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { commands } from "@/lib/bindings";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";
import { AppRoutes } from "@fluster.io/dev";

export class TopicsCommandPaletteRoot extends CommandPaletteCategory {
  constructor() {
    super("Topics", "search-by-topic");
  }
  filterByLocation(): boolean {
    return true;
  }
  async getItems(): Promise<CommandPaletteAnyEntry[]> {
    const res = await commands.getAllTopics();
    if (res.status === "ok") {
      return res.data.map((x) => {
        return new GeneralCommandPaletteItem(x.value, x.value, async (nav) => {
          const sp = new URLSearchParams();
          sp.set("by_topic", x.value);
          nav(`${AppRoutes.search}?${sp.toString()}`);
        });
      });
    } else {
      console.error("An error occurred while gathering tags: ", res.error);
      return [];
    }
  }
}
