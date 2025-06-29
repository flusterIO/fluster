import React, { type ReactNode } from "react";
import { EqRefProps } from "./types";
import { EqRefAnchor } from "./eq_ref_anchor";
import { EquationReference } from "./eq_ref";

export const EqRef = (props: EqRefProps): ReactNode => {
  if (props.anchor) {
    return <EqRefAnchor {...props} />;
  }
  return <EquationReference {...props} />;
};

EqRef.displayName = "EqRef";
