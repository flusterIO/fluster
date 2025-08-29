import EquationListItem from "#/math/presentation/equations_list/equation_list_item";
import { EquationData } from "@/lib/bindings";
import { cn } from "@fluster.io/dev";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, type ReactNode } from "react";

interface EquationSearchResultsProps {
    equations: EquationData[];
}

export const EquationSearchResults = (
    props: EquationSearchResultsProps
): ReactNode => {
    const [index, setIndex] = useState(0);

    if (props.equations.length === 0) {
        return null;
    }

    const hasItems = props.equations.length > 1;

    const cycleIndex = (dir: -1 | 1): void => {
        const newIndex = index + dir;
        if (newIndex < 0) {
            setIndex(props.equations.length - 1);
        } else if (newIndex >= props.equations.length) {
            setIndex(0);
        } else {
            setIndex(newIndex);
        }
    };

    return (
        <div className="w-full max-w-[min(1080px,100%)]">
            <div className="flex flex-col justify-center items-center w-full">
                <div className="grid grid-cols-[64px_1fr_64px] w-full gap-1">
                    <div
                        className={cn(
                            "w-full h-full bg-card flex flex-col justify-center items-center rounded-lg",
                            hasItems && "cursor-pointer"
                        )}
                        onClick={hasItems ? () => cycleIndex(-1) : undefined}
                    >
                        <ChevronLeft
                            className={
                                props.equations.length > 1
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            }
                        />
                    </div>
                    <EquationListItem
                        classes={{
                            container: "w-full",
                        }}
                        item={props.equations[index]}
                        hideEditButton
                        hideDeleteButton
                    />
                    <div
                        className={cn(
                            "w-full h-full bg-card flex flex-col justify-center items-center rounded-lg",
                            hasItems && "cursor-pointer"
                        )}
                        onClick={hasItems ? () => cycleIndex(1) : undefined}
                    >
                        <ChevronRight
                            className={
                                props.equations.length > 1
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            }
                        />
                    </div>
                </div>
                <div className="w-full flex flex-row justify-center items-center text-sm text-muted-foreground mt-2">{`${index + 1
                    } of ${props.equations.length}`}</div>
            </div>
        </div>
    );
};

EquationSearchResults.displayName = "EquationSearchResults";
