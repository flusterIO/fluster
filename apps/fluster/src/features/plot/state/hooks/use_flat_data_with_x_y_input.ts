import { commands } from "@/lib/bindings";
import {
    ArrayDataWithProps,
    AxisData,
    MathFunctionXYDependent,
} from "../../types/plot_types";
import { getMathProps } from "../../utils/get_math_props";
import { useEffect, useState } from "react";

type XReturn = number[];

export const useFlatAxisDataWithXYInput = (
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
            const res: number[] = [];
            for (let i = 0; i < x.data.length; i++) {
                const __x = x.data[i];
                const __y = y.data[i];
                const fRes = d(mathProps, __x, __y);
                if (Array.isArray(fRes)) {
                    return setValue({
                        data: fRes,
                        label: null,
                    });
                } else {
                    res.push(fRes);
                }
            }
            if (res.length === x.data.length) {
                return setValue({
                    data: res,
                    label: null,
                });
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
            return setValue({
                label: d.label,
                data: linspace,
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
