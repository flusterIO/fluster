import { PaginationProps } from "./bindings";

export const getMaxPagination = (): PaginationProps => {
    return {
        page_number: 1,
        per_page: Number.MAX_SAFE_INTEGER,
    };
};
