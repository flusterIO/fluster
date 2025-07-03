import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { showEquationDetailModal } from "../../../utils/event_utils";
import { commands } from "../../../lib/bindings";
import { showToast } from "../../../utils/show_toast";
import { cn } from "../../../utils/cn";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/shad/tooltip";

interface EquationTagProps {
  /// The user provided id of the equation
  id: string;
}

export const EquationTag = (props: EquationTagProps): ReactNode => {
  const [equationId, setEquationId] = useState<null | string>(null);
  const equationIdRef = useRef(equationId);
  useEffect(() => {
    equationIdRef.current = equationId;
  }, [equationId]);
  const handleClick = (eqId: string | null): void => {
    if (!eqId) {
      showToast({
        title: "Not found",
        body: "We couldn't find an equation with this id.",
        variant: "Error",
        duration: 5000,
      });
      return;
    }
    showEquationDetailModal(eqId);
  };
  const getData = async (eqId: string): Promise<void> => {
    const res = await commands.getEquationByUserProvidedId([eqId]);
    if (res.status === "ok") {
      const item = res.data.find((x) => x.equation_id === eqId);
      if (item) {
        setEquationId(item.id);
      } else {
        showToast({
          body: `No equation was found for the id ${eqId}.`,
          title: "Not found",
          duration: 5000,
          variant: "Error",
        });
      }
    }
  };

  useEffect(() => {
    getData(props.id);
  }, [props.id]);

  if (!equationId) {
    return (
      <Tooltip>
        <TooltipContent>Equation id not found</TooltipContent>
        <TooltipTrigger asChild>
          <span
            onClick={() => handleClick(equationIdRef.current)}
            className={
              "rounded p-1 cursor-default bg-secondary text-secondary-foreground text-nowrap"
            }
          >
            {`#${props.id}`}
          </span>
        </TooltipTrigger>
      </Tooltip>
    );
  }

  return (
    <span
      onClick={() => handleClick(equationIdRef.current)}
      className={cn(
        "rounded p-1 text-nowrap",
        equationId
          ? "cursor-pointer bg-primary text-primary-foreground"
          : "cursor-default bg-secondary text-secondary-foreground"
      )}
    >
      {`#${props.id}`}
    </span>
  );
};

EquationTag.displayName = "EquationTag";
