import React, { useState, type ReactNode } from "react";
import { EquationSchemaData } from "../equations_page/types";
import EquationListItem from "../equations_list/equation_list_item";
import { useEventListener } from "@fluster.io/dev";

interface EventProps {
    data: EquationSchemaData;
}

declare global {
    interface WindowEventMap {
        "set-equation-preview-data": CustomEvent<EventProps>;
    }
}

const EquationPreview = (): ReactNode => {
    const [data, setData] = useState<EquationSchemaData>({
        body: "",
        desc: "",
        id: "",
        label: "",
        snippet_ids: [],
        tags: [],
        user_provided_id: "",
    });

    useEventListener("set-equation-preview-data", (e) => setData(e.detail.data));

    const now = new Date().valueOf().toString();

    return (
        <EquationListItem
            item={{
                equation: {
                    body: data?.body ?? "",
                    desc: data?.desc ?? "",
                    label: data?.label ?? "",
                    id: data?.id ?? "",
                    ctime: now,
                    utime: now,
                    equation_id: data?.user_provided_id ?? null,
                },
                tags: data.tags.map((t) => {
                    return {
                        value: t,
                        ctime: now,
                    };
                }),
            }}
        />
    );
};

EquationPreview.displayName = "EquationPreview";

export default EquationPreview;
