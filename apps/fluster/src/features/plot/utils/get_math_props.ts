import { Constants, FlusterArray } from "@fluster.io/dev";
import { ExtendedMath } from "../types/plot_types";
import { commands } from "@/lib/bindings";

export const getMathProps = (): ExtendedMath => {
    return {
        linspace: async (min: number, max: number, nItems: number) =>
            FlusterArray.fromData(
                await commands.linspace(min, max, nItems as unknown as string)
            ),
        arange: async (min: number, max: number, gap: number) =>
            FlusterArray.fromData(await commands.arange(min, max, gap)),
        arr: () => new FlusterArray(),
        arrOfLength: (length: number) => FlusterArray.fromLength(length),
        arrFromData: (data: number[]) => FlusterArray.fromData(data),
        constants: () => new Constants(),
    };
};
