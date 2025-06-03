import { LoadingComponent } from "@/components/loading_screen";
import { commands, EquationModel } from "@/lib/bindings";
import React, { useEffect, useState, type ReactNode } from "react";
import EquationListItem from "./equation_list_item";
import { useEventListener } from "@fluster.io/dev";

declare global {
    interface WindowEventMap {
        "request-equation-list-refresh": CustomEvent<object>;
    }
}

const EquationsList = (): ReactNode => {
    const [items, setItems] = useState<EquationModel[] | null>(null);

    const getItems = async (): Promise<void> => {
        const res = await commands.getEquations();
        if (res.status === "ok") {
            setItems(res.data);
        } else {
            console.error("Get Equations response: ", res);
        }
    };

    useEventListener("request-equation-list-refresh", () => {
        console.log(`Getting new items`);
        getItems();
    });

    useEffect(() => {
        getItems();
    }, []);

    if (items === null) {
        return (
            <div className="w-full flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] h-full min-w-full">
                <LoadingComponent />
            </div>
        );
    }
    return (
        <div className="w-full flex flex-col justify-start items-center gap-8">
            {items.map((x) => (
                <EquationListItem key={x.id} item={x} />
            ))}
        </div>
    );
};

EquationsList.displayName = "EquationsList";

export default EquationsList;
