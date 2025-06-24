"use client";
import { BoltIcon as BoltIconComp } from "lucide-react";
import React, {
    ForwardedRef,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from "react";
import { Variants, motion, useAnimate } from "framer-motion";
import clsx from "clsx";
import { useViewport } from "#/core/hooks/use_viewport";

const BoltIcon = motion.create(BoltIconComp);

interface ConfigStreamIconProps {
    show: boolean;
    delay?: number;
    animFinished: boolean;
}

interface P {
    className?: string;
    streamIndex: number | "all";
    show: boolean;
}

const streamVariants: Variants = {
    show: {
        stroke: "hsl(var(--muted))",
        pathLength: 0,
        pathOffset: 0,
        transition: {
            pathLength: {
                duration: 0,
            },
        },
    },
    stream: {
        stroke: "hsl(var(--brand))",
        pathLength: 1,
        pathOffset: 1,
    },
};

const streamVariantsMuted: Variants = {
    hide: {
        pathLength: 0,
    },
    show: {
        stroke: "hsl(var(--muted-foreground))",
        opacity: 0.4,
        pathLength: 1,
        pathOffset: 0,
    },
    stream: {
        stroke: "hsl(var(--muted-foreground))",
        opacity: 0.4,
        pathLength: 1,
        pathOffset: 0,
    },
};

const maxIndex = 5;

const ConfigStream = forwardRef(
    ({ className, streamIndex, show }: P, ref: ForwardedRef<SVGSVGElement>) => {
        return (
            <svg
                /* height="100%" */
                strokeMiterlimit="10"
                ref={ref}
                style={{
                    fillRule: "nonzero",
                    clipRule: "evenodd",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                }}
                version="1.1"
                viewBox="0 0 712.638 1622.4"
                /* width="100%" */
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                <defs />
                <g id="Layer-1">
                    <motion.path
                        d="M28.293 851.818C660.898 1571.22 85.2345 1542.55 674.479 1579.64"
                        fill="none"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeWidth="10"
                        initial="hide"
                        variants={streamVariants}
                        animate={
                            Boolean((streamIndex === 5 || streamIndex === "all") && show)
                                ? "stream"
                                : show
                                    ? "show"
                                    : "hide"
                        }
                    />
                    <motion.path
                        d="M32.3223 758.666C660.945 35.7831 85.4483 67.6289 674.479 27.2909"
                        fill="none"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeWidth="10"
                        initial="hide"
                        variants={streamVariants}
                        animate={
                            Boolean((streamIndex === 1 || streamIndex === "all") && show)
                                ? "stream"
                                : show
                                    ? "show"
                                    : "hide"
                        }
                    />
                    <motion.path
                        d="M41.559 783.81C655.176 409.766 497.326 399.264 674.479 392.978"
                        fill="none"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeWidth="10"
                        initial="hide"
                        variants={streamVariants}
                        animate={
                            Boolean((streamIndex === 2 || streamIndex === "all") && show)
                                ? "stream"
                                : show
                                    ? "show"
                                    : "hide"
                        }
                    />
                    <motion.path
                        d="M41.559 818.735C655.176 1229.42 497.326 1240.95 674.479 1247.85"
                        fill="none"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeWidth="10"
                        initial="hide"
                        variants={streamVariants}
                        animate={
                            Boolean((streamIndex === 4 || streamIndex === "all") && show)
                                ? "stream"
                                : show
                                    ? "show"
                                    : "hide"
                        }
                    />
                    <motion.path
                        d="M63.0214 799.563L674.479 798.649"
                        fill="none"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeWidth="10"
                        initial="hide"
                        variants={streamVariants}
                        animate={
                            Boolean((streamIndex === 3 || streamIndex === "all") && show)
                                ? "stream"
                                : show
                                    ? "show"
                                    : "hide"
                        }
                    />

                    <motion.path
                        d="M28.293 851.818C660.898 1571.22 85.2345 1542.55 674.479 1579.64"
                        fill="none"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeWidth="10"
                        initial="hide"
                        variants={streamVariantsMuted}
                        animate={streamIndex === 5 ? "stream" : show ? "show" : "hide"}
                    />
                    <motion.path
                        d="M32.3223 758.666C660.945 35.7831 85.4483 67.6289 674.479 27.2909"
                        fill="none"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeWidth="10"
                        initial="hide"
                        variants={streamVariantsMuted}
                        animate={streamIndex === 1 ? "stream" : show ? "show" : "hide"}
                    />
                    <motion.path
                        d="M41.559 783.81C655.176 409.766 497.326 399.264 674.479 392.978"
                        fill="none"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeWidth="10"
                        initial="hide"
                        variants={streamVariantsMuted}
                        animate={streamIndex === 2 ? "stream" : show ? "show" : "hide"}
                    />
                    <motion.path
                        d="M41.559 818.735C655.176 1229.42 497.326 1240.95 674.479 1247.85"
                        fill="none"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeWidth="10"
                        initial="hide"
                        variants={streamVariantsMuted}
                        animate={streamIndex === 4 ? "stream" : show ? "show" : "hide"}
                    />
                    <motion.path
                        d="M63.0214 799.563L674.479 798.649"
                        fill="none"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeWidth="10"
                        initial="hide"
                        variants={streamVariantsMuted}
                        animate={streamIndex === 3 ? "stream" : show ? "show" : "hide"}
                    />
                </g>
            </svg>
        );
    }
);

ConfigStream.displayName = "ConfigStream";

const proportions = [1, 4];

const ConfigStreamIcon = ({
    show,
    delay = 1500,
    animFinished,
}: ConfigStreamIconProps) => {
    const [streamIndex, setStreamIndex] = useState<number | "all">("all");
    const timer = useRef<NodeJS.Timeout | null>(null);
    const [orie, setOrie] = useState<"h" | "v">("h");
    const orientation = useRef<"h" | "v">("h");
    const [scope, animate] = useAnimate();
    const container = useRef<HTMLDivElement>(null!);
    const boltRadius = useRef(0);
    const configStream = useRef<SVGSVGElement>(null!);
    const [isReady, setReady] = useState(false);

    const animateSequence = (idx: number = 1, totalIndex: number = 1) => {
        setStreamIndex(idx);
        animate(scope.current, {
            rotate: `${(Math.PI / 3) * totalIndex}rad`,
            scale: boltRadius.current / 16,
            opacity: 1,
            /* ...(orientation.current === "v" && { */
            /*     top: 0 */
            /* }), */
            transition: {
                type: "linear",
                bounce: 0,
            },
        });
        timer.current = setTimeout(
            () => animateSequence(idx === maxIndex ? 1 : idx + 1, totalIndex + 1),
            delay
        );
    };
    const vp = useViewport();
    const handleResize = () => {
        const ar = 2.4;
        const rect = container.current.getBoundingClientRect();
        const orie = rect.width > rect.height ? "v" : "h";
        orientation.current = orie;
        setOrie(orie);
        console.log("orie: ", orie);
        const r = Math.min(rect.width * 0.12, rect.height * 0.15);
        const maxH = rect.width / ar;
        const h = Math.min(
            (rect.height * proportions[1]) / (proportions[1] + proportions[0]),
            maxH
        );
        configStream.current.style.width = `${h}px`;
        configStream.current.style.height = `${h * ar}px`;
        if (orie === "v") {
            console.log("w: ", h);
            /// Item is rotated, so width is height nad height is width
            /* configStream.current.style.width = `${h}px` */
            /* configStream.current.style.height = `${h * ar}px` */
            scope.current.style.top = (rect.height - h) / 2;
            scope.current.style.left = rect.width / 2 - 8;
        } else {
            scope.current.style.top = rect.height / 2 - 8;
            scope.current.style.left = (rect.width - h) / 2;
            /* scope.current.style.top = "50%" */
        }
        console.log("r: ", r);
        boltRadius.current = r;
        setReady(true);
    };
    useEffect(() => {
        if (animFinished) {
            handleResize();
        }
        /* eslint-disable-next-line  --  */
    }, [vp, animFinished]);
    useEffect(() => {
        if (show) {
            timer.current = setTimeout(animateSequence, 2000);
        } else {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        }
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            setStreamIndex("all");
        };
        /* eslint-disable-next-line  --  */
    }, [show]);

    return (
        <div
            className={
                "w-full h-full flex flex-col justify-center items-center relative"
            }
            ref={container}
        >
            <div
                className={clsx(
                    "max-h-full max-w-full w-full h-full min-w-0 min-h-0 flex justify-center items-center",
                    orie === "v" ? "flex-col w-full" : "flex-row h-full"
                )}
            >
                <div
                    className={clsx(
                        "flex justify-center items-end",
                        orie === "h" ? "flex-col" : "flex-row"
                    )}
                >
                    <BoltIcon
                        className={
                            "fill-brand stroke-white w-4 h-4 opacity-0 absolute z-10"
                        }
                        ref={scope}
                        onAnimationComplete={() => setReady(true)}
                    />
                </div>
                <ConfigStream
                    show={show && animFinished && isReady}
                    streamIndex={streamIndex}
                    className={clsx(
                        "absolute",
                        orie === "h"
                            ? "translate-y-[4px] translate-x-[-8px]"
                            : "rotate-90 h-fit"
                    )}
                    ref={configStream}
                />
            </div>
        </div>
    );
};

ConfigStreamIcon.displayName = "ConfigStreamIcon";

export default ConfigStreamIcon;
