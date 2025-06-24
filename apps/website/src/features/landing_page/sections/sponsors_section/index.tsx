"use client";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import clsx from "clsx";
import AddSponsorCard from "./add_sponsor_card";
import PreventSharpEdges from "#/util_components/prevent_sharp_edges";
import SponsorLogoSampleCard from "./sponsor_logo_sample_card";
import { useViewport } from "#/core/hooks/use_viewport";

export const MainSponsorSection = () => {
    const vp = useViewport();
    const ref = useRef<HTMLDivElement>(null!);

    return (
        <div
            ref={ref}
            className={clsx(
                "group/feature relative w-screen left-0 min-h-screen h-fit flex flex-col justify-center items-center gap-6 z-10 mb-12",
                vp?.window.width && vp.window.width < 768 ? "stack" : "flow"
            )}
        >
            <div className="absolute inset-0 bg-grid-small-neutral-700 pointer-events-none" />
            <motion.h1
                className="relative md:w-full md:max-w-5/6 z-20 text-[9vw] md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-brand text-center font-sans font-bold"
                whileInView={"animate"}
                initial="initial"
                viewport={{
                    once: true,
                    margin: "20px",
                }}
            >
                {"Sponsor".split("").map((l, i) => (
                    <motion.span
                        className={"inline-block"}
                        key={`sponsor-${i}`}
                        variants={{
                            initial: {
                                y: 100,
                                scale: 0,
                            },
                            animate: {
                                y: 0,
                                scale: 1,
                                transition: {
                                    delay: i * 0.15,
                                },
                            },
                        }}
                    >
                        {l}
                    </motion.span>
                ))}
            </motion.h1>
            <div
                className={
                    "w-full z-20 h-fit flex flex-col lg:flex-row flex-wrap gap-x-8 gap-y-6 max-w-[min(768px,90vw)]"
                }
            >
                <SponsorLogoSampleCard isPrimary />
                <SponsorLogoSampleCard />
                <SponsorLogoSampleCard />
                <SponsorLogoSampleCard />
                <AddSponsorCard />
            </div>
            <PreventSharpEdges tighter />
        </div>
    );
};

MainSponsorSection.displayName = "MainSponsorSection";
