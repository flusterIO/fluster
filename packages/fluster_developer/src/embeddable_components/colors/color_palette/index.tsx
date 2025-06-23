import React, { type ReactNode } from "react";
import { defaultBooleanColors } from "../../../utils/get_color_prop";
import { ColorSwatch } from "../color_swatch";

export const ColorPalette = ({
    colors = defaultBooleanColors.map((x) => {
        return {
            color: x,
            label: x.replaceAll("-", "_"),
        };
    }),
}: {
    size?: number;
    colors?: { color: string; label?: string }[];
}): ReactNode => {
    return (
        <div className="w-full gap-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] [&_.color-swatch-container]:w-full">
            {colors.map((c) => (
                <ColorSwatch key={c.color} color={c.color} label={c.label} size={32} />
            ))}
        </div>
    );
};

ColorPalette.displayName = "ColorPalette";
