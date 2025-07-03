import {
    ArrayDataWithProps,
    AxisData,
    MathFunctionXDependent,
} from "../types/plot_types";
import { getMathProps } from "../utils/get_math_props";
import { useEffect, useState } from "react";
import { commands } from "../../../../lib/bindings";

type XReturn = number[];

export const useAxisDataWithXInput = (
    data: AxisData<MathFunctionXDependent, XReturn>,
    x: ArrayDataWithProps<XReturn> | null
) => {
    const [value, setValue] = useState<ArrayDataWithProps<XReturn> | null>(null);

    const handleData = async (
        d: AxisData<MathFunctionXDependent, XReturn>,
        x: ArrayDataWithProps<XReturn> | null
    ): Promise<void> => {
        if (typeof d === "function") {
            const mathProps = getMathProps();
            const res = x?.data.map((_x) =>
                (d as MathFunctionXDependent)(mathProps, _x)
            );
            if (Array.isArray(res)) {
                return setValue({
                    data: res,
                    label: null,
                });
            } else if (res) {
                d = res;
            }
        }
        if (Array.isArray(d)) {
            return setValue({
                data: d as XReturn,
                label: null,
            });
        }
        if ("min" in d) {
            const res = await commands.linspace(d.min, d.max, d.count);
            return setValue({
                label: d.label,
                data: res,
            });
        }
        if ("data" in d) {
            return setValue(d);
        }
    };

    useEffect(() => {
        handleData(data, x);
    }, [data, x]);
    return value;
};
