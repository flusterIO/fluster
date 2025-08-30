import EquationListItem from "#/math/presentation/equations_list/equation_list_item";
import { EquationData } from "@/lib/bindings";
import React, { type ReactNode } from "react";

interface EquationSearchResultsProps {
    equations: EquationData[];
}

export const EquationSearchResults = ({
    equations,
}: EquationSearchResultsProps): ReactNode => {
    return (
        <div className="w-full flex flex-col justify-start items-center gap-4">
            {equations.map((eq) => {
                return (
                    <EquationListItem
                        key={`equation-item-${eq.equation.id}`}
                        classes={{
                            container: "w-full",
                        }}
                        item={eq}
                        hideEditButton
                        hideDeleteButton
                    />
                );
            })}
        </div>
    );
};

EquationSearchResults.displayName = "EquationSearchResults";
