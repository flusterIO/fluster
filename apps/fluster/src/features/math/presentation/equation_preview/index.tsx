import React, { useState, type ReactNode } from "react";
import { EquationSchemaData } from "../equations_page/types";
import EquationListItem from "../equations_list/equation_list_item";
import { LoadingComponent } from "@/components/loading_screen";
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
    const [data, setData] = useState<EquationSchemaData | null>(null);

    useEventListener("set-equation-preview-data", (e) => setData(e.detail.data));

    if (data === null) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center min-h-[calc(100vh-6rem)]">
                <LoadingComponent />
            </div>
        );
    }
    return (
        <EquationListItem
            item={{
                ...data,
                id: "",
                ctime: "0",
                utime: "0",
                equation_id: null,
            }}
        />
    );
};

EquationPreview.displayName = "EquationPreview";

export default EquationPreview;
