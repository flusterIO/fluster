import { FC } from "react";
import { ArrayGeneratorProps } from "../../../lib/bindings";
import { Numpy } from "../../../math/numpy";

export type ArrayData = number[] | number[][] | number[][][];

export interface PlotContainerProps {
  title?: string;
  desc?: string;
  InlineMdxContent: FC<{ mdx: string }>;
}

export interface MathFunctionProps {
  np: () => Numpy;
}

export type MathFunction = (
  props: MathFunctionProps
) => ArrayGeneratorProps | ArrayData;

export type AxisData = ArrayData | MathFunction | ArrayGeneratorProps;

export interface GeneralPlotProps extends PlotContainerProps {}
