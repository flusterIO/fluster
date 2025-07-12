import { AxisGeneratorProps } from "@/lib/bindings";
import { Constants, FlusterArray } from "@fluster.io/dev";

export type ArrayData = number[] | number[][] | number[][][];

export interface PlotContainerProps {
    title?: string;
    desc?: string;
    id?: string;
}

export type ArrayDataWithProps<T extends ArrayData> = Omit<
    AxisGeneratorProps,
    "min" | "max" | "count"
> & { data: T };

export interface ExtendedMath {
    linspace: (min: number, max: number, count: number) => Promise<FlusterArray>;
    arange: (min: number, max: number, gap: number) => Promise<FlusterArray>;
    arr: () => FlusterArray;
    arrOfLength: (length: number) => FlusterArray;
    arrFromData: (data: number[]) => FlusterArray;
    constants: () => Constants;
}

export type MathFunctionReturn<T extends ArrayData> =
    | AxisGeneratorProps
    | ArrayData
    | ArrayDataWithProps<T>;

export type MathFunction = <T extends ArrayData>(
    props: ExtendedMath
) => Promise<MathFunctionReturn<T>>;

export type MathFunctionXDependent = (
    props: ExtendedMath,
    x: number
) => Promise<number>;

export type MathFunctionXYDependent = (
    props: ExtendedMath,
    x: number,
    y: number
) => Promise<number>;

export type AnyMathFunction =
    | MathFunction
    | MathFunctionXDependent
    | MathFunctionXYDependent;

export type AxisData<T extends AnyMathFunction, J extends ArrayData> =
    | J
    | T
    | AxisGeneratorProps
    | ArrayDataWithProps<J>;

export type GeneralPlotProps = PlotContainerProps;
