import React, { ReactNode } from "react";
import { useObserveChildren } from "../../../hooks/use_observe_children";
import { EqRefProps } from "./types";

interface EquationRendereedEventProps {
  id: string;
}
declare global {
  interface WindowEventMap {
    "equation-rendered": CustomEvent<EquationRendereedEventProps>;
  }
}

export const EqRefAnchor = ({
  children,
  id,
}: Pick<EqRefProps, "children" | "id">): ReactNode => {
  const ref = useObserveChildren<HTMLDivElement>(() => {
    window.dispatchEvent(
      new CustomEvent("equation-rendered", {
        detail: {
          id: id,
        },
      })
    );
  });

  return (
    <div className={"w-full h-fit"} id={`eqRef-${id}`} ref={ref}>
      {children}
    </div>
  );
};
