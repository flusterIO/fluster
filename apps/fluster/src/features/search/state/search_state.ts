import { TraditionalSearchResultCategoryId } from "../presentation/search_results_page/types";

export interface SearchState {
    traditionalSearchResults: {
        categoryOpenState: Record<TraditionalSearchResultCategoryId, boolean>;
    };
}
