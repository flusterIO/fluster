import { useEffect, useState } from "react";
import {
    ArrayDataWithProps,
    AxisData,
    MathFunction,
    MathFunctionReturn,
} from "../types/plot_types";
import { getMathProps } from "../utils/get_math_props";
import {
    axisGeneratorPropsToArray,
    OneDimensionalArrayDataType,
} from "../utils/axis_utils";

const getIndependentDataFromAxisData = async (
    data:
        | AxisData<MathFunction, OneDimensionalArrayDataType>
        | MathFunctionReturn<OneDimensionalArrayDataType>
): Promise<ArrayDataWithProps<OneDimensionalArrayDataType>> => {
    if (Array.isArray(data)) {
        return {
            data: data as OneDimensionalArrayDataType,
            label: null,
        };
    }
    if (typeof data === "function") {
        const res = data(getMathProps());
        if (Array.isArray(res)) {
            return {
                data: res as OneDimensionalArrayDataType,
                label: null,
            };
        } else if ("min" in res) {
            return await axisGeneratorPropsToArray(res);
        } else if ("data" in res) {
            return res as ArrayDataWithProps<OneDimensionalArrayDataType>;
        }
    }
    if (typeof data === "object") {
        if ("data" in data) {
            return data;
        }
        if ("min" in data) {
            return await axisGeneratorPropsToArray(data);
        }
    }
    return {
        data: [],
        label: null,
    };
};

export const useAxisData = (
    data: AxisData<MathFunction, number[]>
): ArrayDataWithProps<number[]> | null => {
    const [value, setValue] = useState<ArrayDataWithProps<number[]> | null>(null);

    const handleData = async (
        d: AxisData<MathFunction, number[]> | ArrayDataWithProps<number[]>
    ): Promise<void> => {
        const res = await getIndependentDataFromAxisData(d);
        setValue(res);
    };

    useEffect(() => {
        handleData(data);
    }, [data]);
    return value;
};
