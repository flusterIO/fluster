import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialSearchState } from "./initial_search_state";
import { TraditionalSearchResultCategoryId } from "../presentation/search_results_page/types";

const slice = createSlice({
    name: "search",
    initialState: initialSearchState,
    reducers: {
        toggleTraditionalSearchResultCategory(
            state,
            action: PayloadAction<TraditionalSearchResultCategoryId>
        ) {
            return {
                ...state,
                traditionalSearchResults: {
                    ...state.traditionalSearchResults,
                    categoryOpenState: {
                        ...state.traditionalSearchResults.categoryOpenState,
                        [action.payload]:
                            !state.traditionalSearchResults.categoryOpenState[action.payload],
                    },
                },
            };
        },
    },
});

export const { toggleTraditionalSearchResultCategory } = slice.actions;

export default slice.reducer;
