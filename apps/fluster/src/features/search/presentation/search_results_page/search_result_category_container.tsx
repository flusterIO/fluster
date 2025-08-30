import { Badge, cn, H3 } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { useSearchParams } from "react-router";
import { motion } from "motion/react";
import { TraditionalSearchResults } from "@/lib/bindings";
import { useDispatch } from "react-redux";
import { toggleTraditionalSearchResultCategory } from "#/search/state/slice";

import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";
import { ChevronUp } from "lucide-react";

const connector = connect((state: AppState) => ({
    categoryOpenState: state.search.traditionalSearchResults.categoryOpenState,
}));

interface SearchResultCategoryContainerProps {
    title: ReactNode;
    children: ReactNode;
    byTagOnly?: boolean;
    categoryId: keyof TraditionalSearchResults;
    categoryOpenState: AppState["search"]["traditionalSearchResults"]["categoryOpenState"];
    count: number;
}

export const SearchResultCategoryContainer = connector(
    ({
        children,
        title,
        byTagOnly,
        categoryId,
        categoryOpenState,
        count,
    }: SearchResultCategoryContainerProps): ReactNode => {
        const [sp] = useSearchParams();
        const dispatch = useDispatch();
        if (!sp.has("by_tag") && byTagOnly) {
            return null;
        }
        const isOpen = categoryOpenState[categoryId];
        return (
            <div className="w-full flex flex-col justify-start items-center mb-6">
                <div
                    className="w-full border py-2 pl-4 grid grid-cols-[1fr_64px] place-items-center cursor-pointer bg-card text-card-foreground"
                    onClick={() =>
                        dispatch(toggleTraditionalSearchResultCategory(categoryId))
                    }
                >
                    <div className="w-full relative">
                        <H3 className="w-fit inline">{title}</H3>
                        <div className="inline text-[10px] font-bold ml-1 absolute">
                            {count}
                        </div>
                    </div>
                    <ChevronUp
                        className={cn(
                            "transition-all duration-300 cursor-pointer",
                            isOpen ? "rotate-0" : "rotate-180"
                        )}
                    />
                </div>
                <motion.div
                    className="w-full h-fit px-4 overflow-hidden rounded-bl rounded-br"
                    initial={isOpen ? "open" : "closed"}
                    animate={isOpen ? "open" : "closed"}
                    variants={{
                        open: {
                            height: "auto",
                            border: "1px solid hsl(var(--border))",
                        },
                        closed: {
                            height: 0,
                            border: "none",
                        },
                    }}
                >
                    <div className="p-4">{children}</div>
                </motion.div>
            </div>
        );
    }
);

SearchResultCategoryContainer.displayName = "SearchResultCategoryContainer";
