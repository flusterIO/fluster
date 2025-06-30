import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { showEquationDetailModal } from "../../../utils/event_utils";
import { commands } from "../../../lib/bindings";
import { showToast } from "../../../utils/show_toast";

interface EquationTagProps {
    /// The user provided id of the equation
    id: string;
}

export const EquationTag = (props: EquationTagProps): ReactNode => {
    const [equationId, setEquationId] = useState<null | string>(null);
    const equationIdRef = useRef(equationId);
    useEffect(() => {
        equationIdRef.current = equationId;
    }, [equationId]);
    const handleClick = (eqId: string | null): void => {
        if (!eqId) {
            showToast({
                title: "Not found",
                body: "We couldn't find an equation with this id.",
                variant: "Error",
                duration: 5000,
            });
            return;
        }
        showEquationDetailModal(eqId);
    };
    const getData = async (eqId: string): Promise<void> => {
        const res = await commands.getEquationByUserProvidedId([eqId]);
        if (res.status === "ok") {
            const item = res.data.find((x) => x.equation_id === eqId);
            if (item) {
                setEquationId(item.id);
            } else {
                showToast({
                    body: `No equation was found for the id ${eqId}.`,
                    title: "Not found",
                    duration: 5000,
                    variant: "Error",
                });
            }
        }
    };

    useEffect(() => {
        getData(props.id);
    }, [props.id]);

    return (
        <span
            onClick={() => handleClick(equationIdRef.current)}
            className="bg-primary rounded text-primary-foreground p-1 cursor-pointer"
        >
            {`#${props.id}`}
        </span>
    );
};

EquationTag.displayName = "EquationTag";
