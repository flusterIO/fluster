import React, { type ReactNode } from "react";
import AdmonitionVariantIcon from "./variant_icon";
import { AdmonitionTitleProps } from "./types";
import { cn } from "../../utils/cn";
import { getTitleVariantClasses } from "./utils";
import { ChevronUp as ChevronIcon } from "lucide-react";
import { motion } from "framer-motion";
import { admonitionTitleIconClasses } from "./admonition_title";

const ChevronUp = motion.create(ChevronIcon);

interface Props extends AdmonitionTitleProps {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  children: ReactNode;
}

const FoldableAdmonitionTitle = (props: Props): ReactNode => {
  return (
    <div
      className={cn(
        "w-full pl-2 pr-4 py-2 rounded-tl rounded-tr relative cursor-pointer z-[1]",
        getTitleVariantClasses(props.type)
      )}
      onClick={() => props.setOpen(!props.open)}
    >
      <AdmonitionVariantIcon
        className={admonitionTitleIconClasses}
        variant={props.type}
      />
      <span className="mr-6 inline-block w-[calc(100%-4rem)]">
        {props.children}
      </span>
      <ChevronUp
        className="absolute top-2 right-2"
        variants={{
          folded: {
            rotate: 0,
          },
          open: {
            rotate: 180,
          },
        }}
      />
    </div>
  );
};

FoldableAdmonitionTitle.displayName = "FoldableAdmonitionTitle";

export default FoldableAdmonitionTitle;
