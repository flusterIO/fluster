"use client"
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

interface MiniFeatureScrollBtnProps {
  dir: "left" | "right";
  currentIndex: number;
  maxIndex: number;
  setIndex: (newIndex: number) => void;
  show: boolean;
}

export const MiniFeatureScrollBtn = ({
  dir,
  currentIndex,
  maxIndex,
  setIndex,
  show,
}: MiniFeatureScrollBtnProps) => {
  const Component = dir === "right" ? ChevronRight : ChevronLeft;
  const disabled =
    dir === "right" ? currentIndex >= maxIndex : currentIndex === 0;
  return (
    <motion.button
      disabled={disabled}
      className={"bg-secondary disabled:bg-muted/20 rounded-full p-1"}
      onClick={() =>
        setIndex(dir === "right" ? currentIndex + 1 : currentIndex - 1)
      }
      initial="hide"
      animate={show ? "show" : "hide"}
      variants={{
        show: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: dir === "right" ? 2 : 1.8,
          },
        },
        hide: {
          opacity: 0,
          scale: 0,
        },
      }}
    >
      <Component
        className={disabled ? "text-muted-foreground" : "text-foreground"}
      />
    </motion.button>
  );
};

MiniFeatureScrollBtn.displayName = "MiniFeatureScrollBtn";
