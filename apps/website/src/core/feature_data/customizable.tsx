"use client";
/* eslint-disable react/display-name -- Inline component doesn't need it. */
import { motion } from "framer-motion";
import clsx from "clsx";
import { ForwardedRef, forwardRef } from "react";
import { FeaturedContainerPropsRequired } from "#/features/landing_page/sections/feature_section/types";
import { FeatureMiniCardContainer } from "./feature_mini_card";

export const customizableFeature: FeaturedContainerPropsRequired = {
  label: "Work in any file format?",
  title: "From natural language text to tabular data.",

  /* @ts-expect-error -- This is left over from the old website. Not super concerned about the website until the app is released, so I'll come back to this. */
  override: forwardRef<HTMLDivElement, FeatureFCProps>(
    ({ orientation, shouldShow }, ref: ForwardedRef<HTMLDivElement>) => {
      return (
        <motion.div
          ref={ref}
          className={clsx("max-w-[min(83%,1080px)]", shouldShow && "z-10")}
          initial="hide"
          animate={shouldShow ? "show" : "hide"}
          variants={{
            show: {
              opacity: 1,
            },
            hide: {
              opacity: 0,
            },
          }}
        >
          <motion.h1
            initial="hide"
            animate={shouldShow ? "show" : "hide"}
            variants={{
              hide: {
                opacity: 0,
                x: orientation === "ltr" ? -100 : 100,
              },
              show: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.25,
                },
              },
            }}
            className={"text-4xl md:text-6xl font-bold"}
          >
            Work with Any File Format
          </motion.h1>
          <motion.p
            className={"text-muted-foreground font-bold my-6 lg:w-5/6"}
            initial="hide"
            animate={shouldShow ? "show" : "hide"}
            variants={{
              hide: {
                opacity: 0,
                scale: 0,
              },
              show: {
                opacity: 1,
                scale: 1,
                transition: {
                  delay: 0.65,
                  duration: 0.5,
                  scale: {
                    duration: 1,
                    type: "spring",
                    stiffness: 100,
                  },
                },
              },
            }}
          >
            Import, edit, and organize all your research materials in one place.
            No more switching between different applications.
          </motion.p>
          <FeatureMiniCardContainer
            show={shouldShow}
            orientation={orientation}
          />
        </motion.div>
      );
    }
  ),
  desc: () => null,
  component: () => null,
};
