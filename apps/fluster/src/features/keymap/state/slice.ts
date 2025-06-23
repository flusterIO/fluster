import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialKeymapState } from "./initial_keymap_state";
import { KeymapItem } from "../data/models/keymap_item";
import { KeymapId } from "../data/models/keymap_ids";

const slice = createSlice({
  name: "keymap",
  initialState: initialKeymapState,
  reducers: {
    setKeymapEntry(
      state,
      action: PayloadAction<{ item: KeymapItem; id: KeymapId }>,
    ) {
      state[action.payload.id] = action.payload.item.toString();
    },

    setKeymapEntries(
      state,
      action: PayloadAction<{ id: KeymapId; item: KeymapItem }[]>,
    ) {
      for (const a of action.payload) {
        state[a.id] = a.item.toString();
      }
    },
  },
});

export const { setKeymapEntries, setKeymapEntry } = slice.actions;

export default slice.reducer;
