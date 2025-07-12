import { commands } from "@/lib/bindings";
import {
    ArrayDataWithProps,
    AxisData,
    MathFunctionXYDependent,
} from "../../types/plot_types";
import { getMathProps } from "../../utils/get_math_props";
import { useEffect, useState } from "react";
import { FlusterArray } from "@fluster.io/dev";

type XReturn = number[][];

export const useAxisDataWithXYInput = (
    data: AxisData<MathFunctionXYDependent, XReturn>,
    _x: ArrayDataWithProps<number[]> | null,
    _y: ArrayDataWithProps<number[]> | null
) => {
    const [value, setValue] = useState<ArrayDataWithProps<XReturn> | null>(null);

    const handleData = async (
        d: AxisData<MathFunctionXYDependent, XReturn>,
        x: ArrayDataWithProps<number[]>,
        y: ArrayDataWithProps<number[]>
    ): Promise<void> => {
        if (!x) {
            return;
        }
        if (typeof d === "function") {
            const mathProps = getMathProps();
            const res = [];
            for (const __x of x.data) {
                const line_res = [];
                for (const __y of y.data) {
                    let res = await (d as MathFunctionXYDependent)(mathProps, __x, __y);
                    line_res.push(res);
                }
                res.push(line_res);
            }
            if (res instanceof FlusterArray) {
                return setValue({
                    data: res.data as unknown as number[][],
                    label: null,
                });
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
            const linspace = await commands.linspace(d.min, d.max, d.count);
            const res = [];
            for (let i = 0; i < x.data.length; i++) {
                res.push(linspace);
            }
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
        if (_x && _y) {
            handleData(data, _x, _y);
        }
    }, [data, _x, _y]);
    return value;
};
