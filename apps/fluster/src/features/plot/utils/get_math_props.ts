import { Constants, FlusterArray } from "@fluster.io/dev";
import { ExtendedMath } from "../types/plot_types";

export const getMathProps = (): ExtendedMath => {
    return {
        arr: () => new FlusterArray(),
        arrOfLength: (length: number) => FlusterArray.fromLength(length),
        arrFromData: (data: number[]) => FlusterArray.fromData(data),
        constants: () => new Constants(),
    };
};
