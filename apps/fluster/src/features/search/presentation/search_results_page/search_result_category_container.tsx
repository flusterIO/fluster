import { cn, H3 } from "@fluster.io/dev";
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
}

export const SearchResultCategoryContainer = connector(
    ({
        children,
        title,
        byTagOnly,
        categoryId,
        categoryOpenState,
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
                    className="w-full border py-2 pl-4 grid grid-cols-[1fr_64px] place-items-center"
                    onClick={() =>
                        dispatch(toggleTraditionalSearchResultCategory(categoryId))
                    }
                >
                    <H3 className="w-full">{title}</H3>
                    <ChevronUp
                        className={cn(
                            "transition-all duration-300 cursor-pointer",
                            isOpen ? "rotate-0" : "rotate-180"
                        )}
                    />
                </div>
                <motion.div
                    className="w-full h-fit px-4 bg-card text-card-foreground overflow-hidden rounded-bl rounded-br"
                    initial={isOpen ? "open" : "closed"}
                    animate={isOpen ? "open" : "closed"}
                    variants={{
                        open: {
                            height: "auto",
                            border: "1px solid hsl(var(--border))",
                        },
                        closed: {
                            height: 0,
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
