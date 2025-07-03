import { AxisGeneratorProps, commands } from "../../../../lib/bindings";
import { ArrayDataWithProps } from "../types/plot_types";

export type OneDimensionalArrayDataType = number[];

export const axisGeneratorPropsToArray = async (
    props: AxisGeneratorProps
): Promise<ArrayDataWithProps<OneDimensionalArrayDataType>> => {
    const data = await commands.linspace(props.min, props.max, props.count);
    return {
        data,
        label: props.label,
    };
};
