import { commands } from "@/lib/bindings";
import {
    ArrayDataWithProps,
    AxisData,
    MathFunctionXDependent,
} from "../../types/plot_types";
import { getMathProps } from "../../utils/get_math_props";
import { useEffect, useState } from "react";
import { FlusterArray } from "@fluster.io/dev";

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
        if (!x) {
            return;
        }
        if (typeof d === "function") {
            const mathProps = getMathProps();
            const res: number[] = [];
            for (const __x of x.data) {
                const n: number[] | FlusterArray | number = await (
                    d as MathFunctionXDependent
                )(mathProps, __x);
                /* eslint-disable-next-line  --  */
                if ((n as any) instanceof FlusterArray) {
                    return setValue({
                        data: (n as unknown as FlusterArray).data,
                        label: null,
                    });
                }
                res.push(n);
            }
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
