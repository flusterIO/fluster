import { useEffect, useState } from "react";
import { PaginationProps } from "../lib/bindings";
import { useSearchParams } from "react-router";

export const usePaginationSearchParams = (per_page: number) => {
    const [searchParams] = useSearchParams();
    const [pagination, setPagination] = useState<PaginationProps>({
        page_number: 1,
        per_page,
    });

    useEffect(() => {
        const _page = searchParams.get("page");
        const _per_page = searchParams.get("per_page");
        setPagination({
            page_number: _page ? parseInt(_page) : 1,
            per_page: _per_page ? parseInt(_per_page) : 10,
        });
    }, [searchParams]);

    return pagination;
};
