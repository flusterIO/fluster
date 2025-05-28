"use client"
import { Plus } from "lucide-react";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { swipeConfidenceThreshold, swipePower } from "#/core/utils/swipe_utils";
import { MiniFeature } from "../miniFeatures/types";

interface MiniFeatureCardProps extends MiniFeature {
    idx: number;
    maxWidth: string;
    show: boolean;
    currentIndex: number;
    maxIndex: number;
    setIndex: (newIndex: number) => void;
}

const MiniFeatureCard = ({
    icon,
    desc,
    title,
    seeMoreHref,
    featureKey,
    maxWidth,
    idx,
    setIndex,
    currentIndex,
    maxIndex,
    show,
}: MiniFeatureCardProps) => {
    const _href =
        seeMoreHref || featureKey ? `/imageGallery/${featureKey}` : undefined;
    const Icon = icon;
    return (
        <motion.div
            className={
                "mini-feature-card w-full h-full py-4 pr-4 pl-6 bg-gray-900 rounded-lg flex flex-col justify-start items-start gap-3 border touch-pan-y"
            }
            style={{ maxWidth }}
            id={`mini-feature-card-${idx}`}
            initial="hide"
            animate={show ? "show" : "hide"}
            variants={{
                hide: {
                    x: -100,
                    opacity: 0,
                },
                show: {
                    x: 0,
                    opacity: 1,
                    transition: {
                        delay: 1 + idx * 0.15,
                    },
                },
            }}
            whileDrag={{
                zIndex: 10,
            }}
            drag={"x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold && currentIndex < maxIndex) {
                    setIndex(currentIndex + 1);
                } else if (swipe > swipeConfidenceThreshold && currentIndex > 0) {
                    setIndex(currentIndex - 1);
                }
            }}
        >
            <div className="w-full flex flex-row justify-start items-center">
                <Icon className="inline-block float-left mr-2" />
                <h3
                    className={
                        "font-bold text-xl select-none cursor-default inline-block"
                    }
                >
                    {title}
                </h3>
            </div>
            <div className={"text-sm flex-grow pr-6 select-none cursor-default"}>
                {desc}
            </div>
            <div className={"w-full flex flex-row justify-end items-center h-[20px]"}>
                {_href && (
                    <Link
                        href={_href}
                        className={
                            "group/scrollIcon bg-foreground rounded-full p-1 hover:bg-foreground/20 transition-colors duration-300"
                        }
                    >
                        <Plus
                            className={
                                "stroke-muted/50 w-4 h-4 group-hover/scrollIcon:stroke-foreground"
                            }
                        />
                    </Link>
                )}
            </div>
        </motion.div>
    );
};

MiniFeatureCard.displayName = "MiniFeatureCard";

export default MiniFeatureCard;
