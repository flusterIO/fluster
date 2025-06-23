import React, { HTMLProps } from "react";
import clsx from "clsx";

interface PayPalLinkQrProps
    extends Omit<HTMLProps<HTMLDivElement>, "width" | "height"> {
    fill?: string;
    size?: number;
    background?: string;
}

const PayPalLinkQr = ({
    fill = "hsl(var(--foreground)/0.8)",
    size = 80,
    background = "transparent",
    ...htmlProps
}: PayPalLinkQrProps) => {
    return (
        <div
            {...htmlProps}
            className={clsx("relative w-fit h-fit", htmlProps.className)}
            style={{
                ...htmlProps?.style,
                ...(size && {
                    width: `${size}px`,
                }),
            }}
        >
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 1147 1147"
                /* enable-background="new 0 0 1147 1147" */
                xmlSpace="preserve"
            >
                <rect x="0" y="0" width="1147" height="1147" fill={background} />
                <g transform="translate(62,62)">
                    <g transform="translate(279,0) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,0) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,0) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,0) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(527,0) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(558,0) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(682,0) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,31) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(341,31) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,31) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,31) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,31) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(620,31) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(651,31) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(682,31) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,31) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,62) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,62) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,62) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,62) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(558,62) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,62) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(620,62) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(651,62) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(682,62) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,62) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,93) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,93) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(341,93) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,93) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,93) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(651,93) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,124) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,124) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,124) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,124) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(527,124) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(620,124) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(651,124) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,155) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,155) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,155) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,155) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,155) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,186) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(310,186) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,186) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,186) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,186) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(558,186) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(620,186) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(682,186) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,186) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,217) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,217) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(310,217) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(341,217) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,217) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,217) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,217) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(682,217) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,217) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(0,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(186,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(310,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(341,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(527,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(558,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(682,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(775,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(806,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(961,248) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(0,279) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(124,279) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(217,279) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,279) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(310,279) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,279) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,279) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(558,279) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,279) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(651,279) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,279) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,279) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,279) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,279) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(961,279) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(0,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(31,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(62,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(186,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(341,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(620,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(651,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(961,310) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(62,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(93,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(155,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(217,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(310,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(682,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(806,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(837,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(961,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(992,341) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(62,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(93,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(124,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(155,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(186,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(310,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(341,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(527,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(806,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(837,372) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(0,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(93,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(155,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(527,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(558,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(620,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(651,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(775,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(806,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(837,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(961,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(992,403) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(0,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(31,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(62,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(93,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(124,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(186,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(217,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(310,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(527,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(651,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(775,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(806,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(961,434) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(31,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(62,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(310,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(620,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(775,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(837,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(992,465) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(0,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(31,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(124,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(155,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(186,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(341,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(527,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(682,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(775,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(837,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(992,496) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(31,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(93,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(155,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(217,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(341,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(527,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(558,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(620,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(682,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(775,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(806,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(992,527) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(31,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(62,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(124,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(155,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(186,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(217,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(310,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(341,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(558,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(620,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(651,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(806,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(837,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(992,558) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(31,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(62,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(124,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(155,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(310,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(558,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(620,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(775,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,589) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(0,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(31,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(62,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(124,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(155,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(186,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(217,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(310,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(527,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(558,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(620,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(775,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(992,620) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(0,651) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(124,651) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,651) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,651) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,651) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,651) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,651) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(620,651) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,651) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(775,651) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(837,651) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,651) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,651) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,651) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(0,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(62,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(93,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(186,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(217,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(341,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(651,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(775,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(837,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(961,682) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(0,713) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(93,713) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,713) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,713) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,713) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,713) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(558,713) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,713) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(775,713) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(806,713) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(837,713) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,713) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,713) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(961,713) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(0,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(31,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(124,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(155,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(186,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(217,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(341,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(620,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(775,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(806,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(837,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,744) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,775) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,775) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,775) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(558,775) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,775) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(651,775) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,775) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,775) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,775) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,775) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(992,775) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,806) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,806) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,806) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,806) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(527,806) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(558,806) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(651,806) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(682,806) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,806) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,806) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(806,806) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,806) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,806) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(961,806) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(310,837) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,837) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,837) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(558,837) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,837) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,837) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,837) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,837) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,837) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(961,837) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(341,868) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,868) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,868) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,868) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(620,868) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(651,868) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(682,868) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,868) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(775,868) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(806,868) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(837,868) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,868) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,868) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(961,868) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(992,868) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(341,899) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,899) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,899) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,899) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(527,899) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,899) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(682,899) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,899) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(775,899) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(837,899) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,899) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,899) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,899) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(961,899) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(992,899) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,930) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(310,930) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,930) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(496,930) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,930) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(651,930) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(682,930) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,930) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(837,930) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,930) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,930) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(961,930) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(992,930) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,961) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(341,961) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,961) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,961) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(434,961) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,961) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(589,961) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(620,961) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(682,961) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,961) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(775,961) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(837,961) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,961) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(899,961) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(930,961) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(248,992) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(279,992) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(372,992) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(403,992) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(465,992) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(527,992) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(682,992) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(713,992) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(744,992) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(837,992) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(961,992) scale(0.31,0.31)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(0,0) scale(2.17, 2.17)">
                        <g transform="" style={{ fill }}>
                            <g>
                                <rect
                                    x="15"
                                    y="15"
                                    style={{ fill: "none" }}
                                    width="70"
                                    height="70"
                                />
                                <path d="M85,0H15H0v15v70v15h15h70h15V85V15V0H85z M85,85H15V15h70V85z" />
                            </g>
                        </g>
                    </g>
                    <g transform="translate(806,0) scale(2.17, 2.17)">
                        <g transform="" style={{ fill }}>
                            <g>
                                <rect
                                    x="15"
                                    y="15"
                                    style={{ fill: "none" }}
                                    width="70"
                                    height="70"
                                />
                                <path d="M85,0H15H0v15v70v15h15h70h15V85V15V0H85z M85,85H15V15h70V85z" />
                            </g>
                        </g>
                    </g>
                    <g transform="translate(0,806) scale(2.17, 2.17)">
                        <g transform="" style={{ fill }}>
                            <g>
                                <rect
                                    x="15"
                                    y="15"
                                    style={{ fill: "none" }}
                                    width="70"
                                    height="70"
                                />
                                <path d="M85,0H15H0v15v70v15h15h70h15V85V15V0H85z M85,85H15V15h70V85z" />
                            </g>
                        </g>
                    </g>
                    <g transform="translate(62,62) scale(0.93, 0.93)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(868,62) scale(0.93, 0.93)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                    <g transform="translate(62,868) scale(0.93, 0.93)">
                        <g transform="" style={{ fill }}>
                            <rect width="100" height="100" />
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    );
};

PayPalLinkQr.displayName = "PayPalLinkQr";

export default PayPalLinkQr;
