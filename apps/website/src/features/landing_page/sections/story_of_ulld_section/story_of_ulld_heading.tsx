"use client";
import { motion } from "framer-motion";
import React from "react";

/* const heading = ; */

const StoryOfUlldHeading = ({heading}: {heading: string}) => {
  return (
    <motion.h2
      className={
        "feature-animate opacity-0 text-foreground text-4xl font-bold relative"
      }
      initial={{
        y: "-100px",
        opacity: 0,
      }}
      animate={{
        y: "0px",
        opacity: 1,
        transition: {
          duration: 1,
          top: {
            delay: 2.5,
            type: "spring",
          },
        },
      }}
    >
      {heading.split("").map((l, i) => {
        return (
          <motion.span
            key={i}
            initial={{
              y: -30,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.25 + i * 0.1,
              },
            }}
          >
            {l}
          </motion.span>
        );
      })}
    </motion.h2>
  );
};

StoryOfUlldHeading.displayName = "StoryOfUlldHeading";

export default StoryOfUlldHeading;
