import React, { type ReactNode } from "react";
import { WithColorProps, withColorPropToColor } from "../../types";

interface UlProps extends WithColorProps {
  children: ReactNode;
}

export const Ul = ({ children, ...props }: UlProps): ReactNode => {
  return (
    <span
      className="underline underline-offset-2"
      style={{
        textDecorationColor: withColorPropToColor(props, `hsl(var(--primary))`),
      }}
    >
      {children}
    </span>
  );
};

Ul.displayName = "Ul";
