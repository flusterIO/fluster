"use client";
import React, { useRef } from "react";
import { FeatureContainerProps } from "./types";
import FeatureContainerText from "./feature_container_text";
import FeatureContainerDisplay from "./feature_container_display";
import clsx from "clsx";
import { useInView } from "framer-motion";
import { useViewport } from "#/core/hooks/use_viewport";

const FeatureContainer = ({
    orientation = "ltr",
    expandDisplay,
    override,
    spaceEven,
    displayContainerClasses,
    ...props
}: FeatureContainerProps & { idx: number }) => {
    const vp = useViewport();
    const ref = useRef<HTMLDivElement>(null!);
    const shouldShow = useInView(ref, { margin: "-100px", once: true });
    if (override) {
        const O = override;
        return <O ref={ref} orientation={orientation} shouldShow={shouldShow} />;
    }
    return (
        <div
            ref={ref}
            className={clsx(
                "group/feature w-screen min-h-[calc(100vh-76px)] max-w-[1440px] gap-8 px-8 lg:px-12 mb-16 flex-col justify-around items-center lg:grid lg:grid-cols-2  place-items-center",
                spaceEven ? "grid grid-cols-1 md:flex" : "flex",
                vp?.window.width && vp.window.width < 768 ? "stack" : "flow",
                orientation === "rtl" && "flex-col-reverse lg:flex-row"
            )}
        >
            {orientation === "ltr" ? (
                <>
                    <FeatureContainerText
                        title={props.title}
                        desc={props.desc}
                        label={props.label}
                        orientation={orientation}
                        shouldShow={shouldShow}
                    />
                    <FeatureContainerDisplay
                        containerClasses={displayContainerClasses}
                        displayExpand={expandDisplay || spaceEven}
                        orientation={orientation}
                        component={props.component}
                        shouldShow={shouldShow}
                    />
                </>
            ) : (
                <>
                    <FeatureContainerDisplay
                        containerClasses={displayContainerClasses}
                        displayExpand={expandDisplay || spaceEven}
                        orientation={orientation}
                        component={props.component}
                        shouldShow={shouldShow}
                    />
                    <FeatureContainerText
                        title={props.title}
                        desc={props.desc}
                        label={props.label}
                        orientation={orientation}
                        shouldShow={shouldShow}
                    />
                </>
            )}
        </div>
    );
};

FeatureContainer.displayName = "FeatureContainer";

export default FeatureContainer;
