import { FC } from "react";
import { AxisGeneratorProps } from "../../../../lib/bindings";
import { Numpy } from "../../../../math/numpy";
import { Constants } from "../../../../math/constants";

export type ArrayData = number[] | number[][] | number[][][];

export interface PlotContainerProps {
    title?: string;
    desc?: string;
    InlineMdxContent: FC<{ mdx: string }>;
}

export type ArrayDataWithProps<T extends ArrayData> = Omit<
    AxisGeneratorProps,
    "min" | "max" | "count"
> & { data: T };

export interface MathFunctionProps {
    np: () => Numpy;
    constants: () => Constants;
}

export type MathFunctionReturn<T extends ArrayData> =
    | AxisGeneratorProps
    | ArrayData
    | ArrayDataWithProps<T>;

export type MathFunction = <T extends ArrayData>(
    props: MathFunctionProps
) => MathFunctionReturn<T>;

export type MathFunctionXDependent = (
    props: MathFunctionProps,
    x: number
) => number;

export type MathFunctionXYDependent = (
    props: MathFunctionProps,
    x: number,
    y: number
) => number;

export type AnyMathFunction = MathFunction | MathFunctionXDependent;

export type AxisData<T extends AnyMathFunction, J extends ArrayData> =
    | J
    | T
    | AxisGeneratorProps
    | ArrayDataWithProps<J>;

export interface GeneralPlotProps extends PlotContainerProps {
    darkMode: boolean;
}
