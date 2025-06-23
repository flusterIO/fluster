import React, { type ReactNode } from "react";
import { getColorProp } from "../../../utils/get_color_prop";

interface ColorSwatchProps {
    color: string;
    label?: string;
    size?: number;
}

export const ColorSwatch = ({
    label,
    size = 16,
    ...props
}: ColorSwatchProps): ReactNode => {
    if (label) {
        return (
            <div className="color-swatch-container bg-card p-1 w-fit flex flex-col justify-center items-center gap-2 border rounded px-2 py-4">
                <div
                    className="rounded"
                    style={{
                        backgroundColor: getColorProp(props, "primary").color,
                        width: `${size}px`,
                        height: `${size}px`,
                    }}
                />
                <div className="text-sm">{label}</div>
            </div>
        );
    } else {
        return (
            <div
                className="rounded"
                style={{
                    backgroundColor: getColorProp(props, "primary").color,
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            />
        );
    }
};

ColorSwatch.displayName = "ColorSwatch";
