import React, { type ReactNode } from "react";
import { getColorProp } from "../../../utils/get_color_prop";
import { copyStringToClipboard } from "../../../utils/copy_string_to_clipboard";
import { showToast } from "../../../utils/show_toast";

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
    const copyColor = async (): Promise<void> => {
        const res = await copyStringToClipboard(props.color);
        if (res) {
            showToast({
                title: "Success",
                body: "Your color has been copied to your clipboard.",
                variant: "Success",
                duration: 5000,
            });
        }
    };
    if (label) {
        return (
            <div className="color-swatch-container bg-card p-1 w-fit flex flex-col justify-center items-center gap-2 border rounded px-3 py-4">
                <div
                    onClick={copyColor}
                    className="rounded cursor-pointer"
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
                className="rounded cursor-pointer"
                onClick={copyColor}
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
