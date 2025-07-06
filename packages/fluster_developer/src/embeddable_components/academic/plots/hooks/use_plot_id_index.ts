import { useEffect, useState } from "react";
import { usePlotsContext } from "../utils/plots_provider/context";

export const usePlotIdIndex = (plotId?: string | null) => {
    const state = usePlotsContext();
    const [value, setValue] = useState<number | null>(null);
    useEffect(() => {
        if (plotId) {
            setValue(state.plotIds.indexOf(plotId));
        }
    }, [plotId, state]);
    return value;
};
