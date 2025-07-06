import { Constants } from "../../../../math/constants";
import { FlusterArray } from "../../../../math/numpy";
import { ExtendedMath } from "../types/plot_types";

export const getMathProps = (): ExtendedMath => {
    return {
        arr: () => new FlusterArray(),
        arrOfLength: (length: number) => FlusterArray.fromLength(length),
        arrFromData: (data: number[]) => FlusterArray.fromData(data),
        constants: () => new Constants(),
    };
};
