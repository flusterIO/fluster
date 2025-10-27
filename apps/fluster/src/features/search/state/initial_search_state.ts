import { SearchState } from "./search_state";

export const initialSearchState: SearchState = {
    traditionalSearchResults: {
        categoryOpenState: {
            notes: true,
            snippets: true,
            equations: true,
            tasks: true,
            flashcards: true,
        },
    },
};
