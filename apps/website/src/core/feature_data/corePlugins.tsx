"use client";
import { FeatureDescContainer } from "#/features/landing_page/sections/feature_section/feature_desc_container";
import { FeaturedContainerPropsRequired } from "#/features/landing_page/sections/feature_section/types";
import { slideShowScreenshots } from "./featureAssets/slideShowScreenshots";
import { ImageCarousel } from "#/features/image_carousel";

export const corePluginsFeature: FeaturedContainerPropsRequired = {
    label: "Built to quantize gravity",
    title: "Applicable Everywhere",
    expandDisplay: true,
    displayContainerClasses: "pt-0 md:pt-4 min-h-[30vh]",
    desc: () => {
        return (
            <FeatureDescContainer>
                <span>
                    {
                        "Fluster was built by a single developer with a background in physics to handle his own research after becoming frustrated with other options. There's out of the box support for equations, snippets, bibliography management, task lists, whiteboards, and much, "
                    }
                    <em>much</em> more.
                </span>
                <div className="h-fit w-fit">
                    <span className="text-hint text-sm font-semibold mr-2">Note:</span>
                    <span className="text-sm">
                        AI chat was generated completely offline.
                    </span>
                </div>
            </FeatureDescContainer>
        );
    },
    component: () => {
        return (
            <ImageCarousel
                images={slideShowScreenshots}
                withButtons
                buttonsBottom
                className={"w-full h-auto min-h-[40vh]"}
                classes={{
                    buttonContainer: "justify-center lg:justify-end",
                }}
            />
        );
    },
};
