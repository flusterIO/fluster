import { Constants } from "../../../../math/constants";
import { Numpy } from "../../../../math/numpy";
import { MathFunctionProps } from "../types/plot_types";

export const getMathProps = (): MathFunctionProps => {
    return {
        np: () => new Numpy(),
        constants: () => new Constants(),
    };
};
