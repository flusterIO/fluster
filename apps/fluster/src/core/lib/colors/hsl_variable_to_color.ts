import Color from "color";

export const cssVariableToColor = (val: string, opacity: number = 1) => {
    const vals: string[] = window
        .getComputedStyle(document.body)
        .getPropertyValue(val)
        .split(" ");
    if (!vals || vals.length !== 3) {
        return undefined;
    }

    return Color(`hsl(${vals[0]}, ${vals[1]}, ${vals[2]}, ${opacity})`);
};
