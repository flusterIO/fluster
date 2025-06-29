import React, { HTMLProps, type ReactNode } from "react";

type DivProps = HTMLProps<HTMLDivElement>;

export const Div = (props: DivProps): ReactNode => {
  return <div {...props} />;
};

Div.displayName = "Div";
