"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Handler,
    createGesture,
    dragAction,
    scrollAction,
    wheelAction,
} from "@use-gesture/vanilla";
import { Lethargy } from "lethargy";
const lethargy = new Lethargy();
import { MiniFeatureScrollBtn } from "./mini_feature_scroll_buttons";
import MiniFeatureCard from "./mini_feature_card";
import { allMiniFeatures } from "../miniFeatures/allMiniFeatures";
import { useViewport } from "#/core/hooks/use_viewport";

const Gesture = createGesture([scrollAction, wheelAction, dragAction]);

const dragRequirement = 50;

interface Props {
    show: boolean;
    orientation: "rtl" | "ltr";
}

const cardWidth = 450;

const fullWidthBreakpoint = 640;

export const FeatureMiniCardContainer = ({ show }: Props) => {
    const [focusedIndex, _setFocusedIndex] = useState(0);
    const [maxIndex, _setMaxIndex] = useState(0);
    const mi = useRef(0);
    const fi = useRef(0);
    const vp = useViewport();
    const gap = vp && vp.window.width > fullWidthBreakpoint ? 16 : 0;
    const setMaxIndex = (newIndex: number) => {
        mi.current = newIndex;
        _setMaxIndex(newIndex);
    };
    const setFocusedIndex = (newIndex: number) => {
        fi.current = newIndex;
        _setFocusedIndex(newIndex);
    };
    const scrolling = useRef(false);
    const container = useRef<HTMLDivElement>(null!);
    const containerInner = useRef<HTMLDivElement>(null!);
    const handleMaxIndex = () => {
        const containerWidth = container.current.clientWidth;
        const excessWidth =
            allMiniFeatures.length * (cardWidth + gap) - containerWidth;
        setMaxIndex(
            excessWidth <= 0 ? 0 : Math.ceil(excessWidth / (cardWidth + gap))
        );
    };

    useEffect(() => {
        if (!show) {
            setFocusedIndex(0);
        }
    }, [show]);

    const checkLastIndex = () => {
        const em = document.getElementById(
            `mini-feature-card-${allMiniFeatures.length - 1}`
        );
        if (!em) return;
        const rect = em.getBoundingClientRect();
        const containerRect = container.current.getBoundingClientRect();
        const shouldSetLast = rect.right - containerRect.right <= 4;
        if (shouldSetLast) {
            setMaxIndex(focusedIndex);
        }
        scrolling.current = false;
    };

    const dragListener: Handler<
        "drag",
        PointerEvent | MouseEvent | TouchEvent | KeyboardEvent
    > = ({ active, movement: [mx], direction: [xDir], cancel }) => {
        if (scrolling.current) return;
        scrolling.current = true;

        if (!active || Math.abs(mx) < dragRequirement) {
            return;
        }
        if (xDir > 0 && fi.current !== 0) {
            setFocusedIndex(fi.current - 1);
        } else if (xDir < 0 && fi.current < mi.current) {
            console.log("setFocusedIndex + 1");
            setFocusedIndex(fi.current + 1);
        }
        cancel();
    };

    const scrollListener: Handler<"scroll" | "wheel" | "drag", UIEvent> = (
        data
    ) => {
        if (scrolling.current) return;
        scrolling.current = true;
        const dir = lethargy.check(data.event);
        if (!dir) return;
        if (dir > 0 && fi.current !== 0) {
            setFocusedIndex(fi.current - 1);
        } else if (dir < 0 && fi.current < mi.current) {
            console.log("setFocusedIndex + 1");
            setFocusedIndex(fi.current + 1);
        }
    };

    useEffect(() => {
        handleMaxIndex();
        window.addEventListener("resize", handleMaxIndex);
        Gesture(
            containerInner.current,
            {
                onScroll: scrollListener,
                onWheel: scrollListener,
                onDrag: dragListener,
            },
            {
                scroll: {
                    preventDefault: true,
                    axis: "x",
                },
                wheel: {
                    preventDefault: true,
                    axis: "x",
                },
                drag: {
                    preventDefault: true,
                    axis: "x",
                },
            }
        );
        return () => {
            window.removeEventListener("resize", handleMaxIndex);
        };
        /* eslint-disable-next-line  --  */
    }, []);

    return (
        <div
            className={"overflow-hidden max-w-[min(83vw,1080px)] mt-8 space-y-6"}
            ref={container}
        >
            <motion.div
                className={"w-full h-fit grid min-h-0 min-w-0 touch-none"}
                ref={containerInner}
                style={{
                    gridTemplateColumns:
                        gap === 0
                            ? `repeat(${allMiniFeatures.length}, 83vw)`
                            : `repeat(${allMiniFeatures.length}, ${cardWidth}px)`,
                    gap: `${gap}px`,
                }}
                animate={{
                    x:
                        gap === 0
                            ? `${83 * -focusedIndex}vw`
                            : (cardWidth + gap) * -focusedIndex,
                    transition: {
                        bounce: 0,
                    },
                }}
                onAnimationComplete={checkLastIndex}
            >
                {allMiniFeatures.map((item, i) => {
                    return (
                        <MiniFeatureCard
                            key={i}
                            idx={i}
                            maxWidth={gap === 0 ? "83vw" : `${cardWidth}px`}
                            show={show}
                            currentIndex={focusedIndex}
                            maxIndex={maxIndex}
                            setIndex={setFocusedIndex}
                            {...item}
                        />
                    );
                })}
            </motion.div>
            <div className={"flex flex-row justify-end items-center gap-4"}>
                <MiniFeatureScrollBtn
                    dir="left"
                    currentIndex={focusedIndex}
                    maxIndex={maxIndex}
                    setIndex={setFocusedIndex}
                    show={show}
                />
                <MiniFeatureScrollBtn
                    dir="right"
                    currentIndex={focusedIndex}
                    maxIndex={maxIndex}
                    setIndex={setFocusedIndex}
                    show={show}
                />
            </div>
        </div>
    );
};

FeatureMiniCardContainer.displayName = "FeatureMiniCardContainer";
