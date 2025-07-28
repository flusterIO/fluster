"use client";
import { AnimatePresence, motion } from "framer-motion";
import { StaticImageData } from "next/image";
import React, { useRef, useState } from "react";
import NextImage from "next/image";
import { wrap } from "popmotion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./styles.module.scss";
import { swipeConfidenceThreshold, swipePower } from "#/core/utils/swipe_utils";
import { cn } from "#/core/utils/cn";

const Image = motion.create(NextImage);

export type SlideShowImage = {
    src: StaticImageData;
    className?: string;
    alt?: string;
};

interface ImageCarouselProps {
    images: SlideShowImage[];
    className?: string;
    alt?: string;
    withButtons?: boolean;
    buttonsBottom?: boolean;
    classes?: {
        buttonContainer?: string;
    };
}

const variants = {
    exit: (dir: number) => ({
        zIndex: 0,
        x: dir * -1000,
        opacity: 0,
    }),
    animate: {
        zIndex: 1,
        opacity: 1,
        x: 0,
    },
    initial: (dir: number) => ({
        x: dir * 1000,
        opacity: 0,
    }),
};

export const ImageCarousel = ({
    className,
    images,
    alt,
    withButtons,
    buttonsBottom,
    classes = {},
}: ImageCarouselProps) => {
    const [[page, direction], setState] = useState<[number, number]>([0, 0]);
    const timer = useRef<NodeJS.Timeout | null>(null);
    const imageIndex = wrap(0, images.length, page);

    const cycleImages = (dir: 1 | -1 = 1) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        const _timer = setTimeout(() => {
            cycleImages(1);
        }, 5000);
        timer.current = _timer;
        setState([page + dir, dir]);
    };

    const handleClick = () => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        cycleImages(1);
    };

    return (
        <div className={"w-full h-full"}>
            <div
                className={cn(
                    "w-full lg:h-full flex flex-col justify-center items-center max-w-full max-h-full overflow-hidden relative",
                    className
                )}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <Image
                        key={page}
                        onClick={handleClick}
                        src={images[imageIndex].src}
                        className={cn(
                            "absolute max-w-full max-h-full h-full w-auto object-contain",
                            images[imageIndex].className
                        )}
                        custom={direction}
                        alt={images[imageIndex].alt || alt || "ULLD Image"}
                        variants={variants}
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        initial="initial"
                        animate="animate"
                        drag={"x"}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(_, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) {
                                cycleImages(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                cycleImages(-1);
                            }
                        }}
                    />
                </AnimatePresence>
                {withButtons && !buttonsBottom && (
                    <>
                        <div className={styles["prev-btn"]} onClick={() => cycleImages(-1)}>
                            <ChevronLeft />
                        </div>
                        <div className={styles["next-btn"]} onClick={() => cycleImages(1)}>
                            <ChevronRight />
                        </div>
                    </>
                )}
            </div>
            {withButtons && buttonsBottom && (
                <div
                    className={cn(
                        "h-12 flex flex-row justify-end items-center gap-4",
                        classes.buttonContainer
                    )}
                >
                    <button
                        onClick={() => cycleImages(-1)}
                        className={"bg-secondary rounded-full p-1 h-8 w-8 cursor-pointer"}
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={() => cycleImages(1)}
                        className={"bg-secondary rounded-full p-1 h-8 w-8 cursor-pointer"}
                    >
                        <ChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
};

ImageCarousel.displayName = "ImageCarousel";
