import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { ReactNode } from "react";

export class RecentlyAccessedCommandPaletteRoot extends CommandPaletteCategory {
  constructor() {
    super("Recently Accessed Notes", "cmd-palette-recently-accessed-notes");
  }
  filterByLocation(): boolean {
    return true;
  }
  bottomBar(): ReactNode {
    return null;
  }
  async getItems(): Promise<CommandPaletteAnyEntry[]> {
    return [];
    // const items = await commands.getNoteSummaries({
    //     per_page: 1000 as unknown as string,
    //     page_number: 1 as unknown as string,
    // });
    // if (items.status === "ok") {
    //     return items.data.filter((item) => item.).map((x) => {
    //         return new GeneralCommandPaletteItem(
    //             x.title,
    //             `${x.title}-${x.file_path}`,
    //             async (nav) => {
    //                 nav(getMdxNoteUrl(x.file_path));
    //             }
    //         );
    //     });
    // } else {
    //     return [];
    // }
  }
}
