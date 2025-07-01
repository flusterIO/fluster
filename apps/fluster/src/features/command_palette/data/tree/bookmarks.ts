import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { commands } from "@/lib/bindings";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";
import { getMdxNoteUrl } from "#/mdx/utils/get_mdx_note_url";
import { ReactNode } from "react";

export class BookmarksCommandPaletteRoot extends CommandPaletteCategory {
  constructor() {
    super("Bookmarks", "bookmarked-notes");
  }
  filterByLocation(): boolean {
    return true;
  }
  bottomBar(): ReactNode {
    return null;
  }
  async getItems(): Promise<CommandPaletteAnyEntry[]> {
    const res = await commands.getBookmarkedNotes();
    if (res.status === "ok") {
      return res.data.map((x) => {
        return new GeneralCommandPaletteItem(
          x.front_matter.title,
          x.note.file_path,
          async (nav) => {
            nav(getMdxNoteUrl(x.note.file_path));
          }
        );
      });
    } else {
      console.error("An error occurred while gathering bookmarks: ", res.error);
      return [];
    }
  }
}
