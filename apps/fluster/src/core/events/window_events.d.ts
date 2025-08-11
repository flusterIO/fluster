import { KeymapId } from "#/keymap/data/models/keymap_ids";
import { Location } from "react-router";
import { ShowCommandPaletteEventProps } from "./show_command_palette";

export interface BibEntryDetailsProps {
  itemId: string;
}
export interface BibEntryDetails {
  id: string;
  title?: string | null;
}

export interface ShowEquationDetailModalEventProps {
  /// The id of the equation, *not* the user provided id.
  id: string;
}

export interface EditKeymapSettingModalProps {
  settingKey: KeymapId;
  stringifiedKeyMap: string;
}

declare global {
  interface WindowEventMap {
    show_command_palette: CustomEvent<ShowCommandPaletteEventProps>;
    "show-bib-entry-details": CustomEvent<BibEntryDetailsProps>;
    "page-navigate": CustomEvent<{ location: Location }>;
    "show-equation-detail-modal": CustomEvent<ShowEquationDetailModalEventProps>;
    "database-sync-success": CustomEvent<object>;
    "refresh-mdx": CustomEvent<object>;
    "refresh-task-manager-timers": CustomEvent<object>;
    "refresh-kanban-board-list": CustomEvent<object>;
    "refresh-task-manager-timers": CustomEvent<object>;
    // -- Settings --
    "show-edit-keymap-modal": CustomEvent<EditKeymapSettingModalProps>;
    "audio-seek-to-seconds": CustomEvent<{
      id: string;
      seconds: number;
    }>;
    "request-local-model-list-refresh": CustomEvent<object>;
    "refresh-embedded-task-list": CustomEvent<{ taskListId: string }>;
    "refresh-auto-setting-list": CustomEvent<object>;
  }
}
