import React from "react";
import { IconProps } from "../types";

/// If foreground is set to true, the icon is filled with the 'text-foreground' color.
export const FlusterIcon = ({
  foreground,
  fill,
  ...props
}: IconProps & { foreground?: boolean; fill?: string }) => {
  return (
    <svg
      {...props}
      width="172"
      height="266"
      viewBox="0 0 172 266"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M150.397 0.993164L170.958 37.7305L171.052 37.8994L171.009 38.0879L167.987 51.1133L167.897 51.501L167.5 51.5L76.4678 51.4746L71.5273 143.475H139.56L139.353 144.127L132.998 164.127L132.888 164.475H71.46L66.7295 243.636L93.8271 264.579L94.9844 265.474L93.5215 265.475L2.26074 265.549L0.481445 265.55L2 264.622L37.5508 242.896L47.501 62.8076L22.7783 46.6436L22.5215 46.4746L22.5557 46.1699L23.4717 37.9199L23.5215 37.4746H131.033L149.516 1.01172L149.939 0.174805L150.397 0.993164Z"
        fill={
          fill
            ? fill
            : foreground
            ? "hsl(var(--foreground))"
            : "hsl(var(--primary))"
        }
      />
    </svg>
  );
};

FlusterIcon.displayName = "FlusterIcon";

export default FlusterIcon;
