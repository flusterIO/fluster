import { PaginationProps } from "./bindings";

export const getMaxPagination = (): PaginationProps => {
    return {
        page_number: 1 as unknown as string,
        per_page: Number.MAX_SAFE_INTEGER as unknown as string,
    };
};
