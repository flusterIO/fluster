"use client";
import React from "react";
import FeatureContainer from "./feature_container";
import { allFeatures } from "#/core/feature_data/allFeatures";
import { FeaturedContainerPropsRequired } from "./types";

export const HighlightedFeaturesSection = () => {
    return (
        <section
            className={
                "relative flex flex-col min-h-[calc(100vh-76px)] h-fit justify-center items-center gap-4 bg-transparent"
            }
        >
            {allFeatures.map((f: FeaturedContainerPropsRequired, i: number) => {
                return (
                    <FeatureContainer
                        {...f}
                        key={i}
                        idx={i}
                        orientation={i % 2 === 0 ? "ltr" : "rtl"}
                    />
                );
            })}
        </section>
    );
};

HighlightedFeaturesSection.displayName = "DescriptionSection";
