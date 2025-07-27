"use client";
import clsx from "clsx";
import Link from "next/link";
import { TechIconLink } from "./featureAssets/communityTechIcons/techIconLink";
import { techIconClasses } from "./pluginArchitecture";
import { FeaturedContainerPropsRequired } from "#/features/landing_page/sections/feature_section/types";
import { FeatureDescContainer } from "#/features/landing_page/sections/feature_section/feature_desc_container";
import { buttonVariants } from "../shad/ui/button";

export const integrationsFeature: FeaturedContainerPropsRequired = {
    label: () => {
        return (
            <span className={"relative"}>
                <span
                    className={
                        "text-3xl absolute left-0 top-[50%] translate-y-[-50%] contents"
                    }
                >
                    ∫
                </span>
                <span>ntegration</span>
            </span>
        );
    },
    title: () => {
        return <div className={"min-h-[40px]"}>An integral part of Fluster</div>;
    },
    desc: ({ orientation }) => {
        return (
            <FeatureDescContainer>
                <span>
                    With support for integration with Google Calendar and Jupyter with
                    more external integrations planned for the near future, integrating
                    Fluster with your existing workflow is painless.
                </span>
                <div
                    className={clsx(
                        "w-full px-8 flex flex-row items-center justify-center mt-4 md:mt-0",
                        orientation === "rtl"
                            ? "justify-start md:justify-end"
                            : "justify-start"
                    )}
                >
                    <Link href="/coming_soon" className={buttonVariants()}>
                        Submit a feature request
                    </Link>
                </div>
            </FeatureDescContainer>
        );
    },
    component: ({ shouldShow: isInView }) => {
        return (
            <div className={"w-auto grid grid-cols-2 gap-8 grid-rows-2"}>
                <TechIconLink
                    show={isInView}
                    index={1}
                    className={techIconClasses}
                    icon="jupyter"
                />
                <TechIconLink
                    show={isInView}
                    index={2}
                    className={techIconClasses}
                    icon="mdx"
                />
                <TechIconLink
                    show={isInView}
                    index={3}
                    className={techIconClasses}
                    icon="latex"
                />
                <TechIconLink
                    show={isInView}
                    index={4}
                    className={techIconClasses}
                    icon="googleCalendar"
                />
            </div>
        );
    },
};
