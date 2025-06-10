import {
    useBibTableContext,
    useBibTableDispatch,
} from "#/bibliography/state/bib_table_context";
import { Button } from "@fluster.io/dev";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { type ReactNode } from "react";

export const BibTableButtomButtons = (): ReactNode => {
    const { count, pagination } = useBibTableContext();
    const dispatch = useBibTableDispatch();
    return (
        <div className="w-full flex flex-row justify-end items-center gap-6">
            <Button
                onClick={() =>
                    dispatch({
                        type: "decrementPage",
                        payload: null,
                    })
                }
                size={"icon"}
                disabled={pagination.page_number <= 1}
            >
                <ChevronLeft />
            </Button>
            <Button
                onClick={() =>
                    dispatch({
                        type: "incrementPage",
                        payload: null,
                    })
                }
                size={"icon"}
                disabled={pagination.page_number > (count / pagination.per_page)}
            >
                <ChevronRight />
            </Button>
        </div>
    );
};

BibTableButtomButtons.displayName = "BibTableButtomButtons";
