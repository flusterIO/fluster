"use client";
import { useViewportProportionalPosition } from "#/core/hooks/use_viewport_proportional_position";
import { cn } from "#/core/utils/cn";
import { HTMLMotionProps, motion } from "framer-motion";
import React, { ReactNode, useRef } from "react";

const maxOpacity = 0.8;

interface BackgroundGradientProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    className?: string;
    animate?: boolean;
    border?: boolean;
    classes?: {
        container?: string;
        card?: string;
    };
}

export const BackgroundGradient = ({
    children,
    animate,
    classes = {},
    className,
    border = false,
    ...props
}: BackgroundGradientProps) => {
    const ref = useRef<HTMLDivElement>(null!);
    const bg = useRef<HTMLDivElement>(null!);
    const sp = useRef<number>(0);
    const variants = {
        initial: {
            backgroundPosition: "0 50%",
        },
        animate: {
            backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
        },
    };

    useViewportProportionalPosition(ref, (_sp) => {
        if (!bg.current) return;
        sp.current = _sp;
        bg.current.style.opacity = `${maxOpacity * _sp}`;
    });

    const handleHover = (isHovered: boolean) => {
        if (isHovered) {
            bg.current.style.transition = "opacity 0.5s ease-in";
            bg.current.style.opacity = "1";
        } else {
            bg.current.style.transition = "opacity 0.5s ease-in";
            bg.current.style.opacity = `${sp.current * sp.current}`;
            bg.current.ontransitionend = () => (bg.current.style.transition = "");
        }
    };

    return (
        <motion.div
            {...props}
            className={cn("relative p-[4px] group", classes.container)}
            ref={ref}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
        >
            <motion.div
                ref={bg}
                style={{
                    backgroundSize: animate ? "400% 400%" : undefined,
                }}
                className={cn(
                    "absolute inset-0 rounded-3xl z-[1] opacity-60 blur-xl will-change-transform",
                    "bg-[radial-gradient(circle_farthest-side_at_0_100%,hsl(var(--brand)),transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
                )}
            />
            {border && (
                <motion.div
                    variants={animate ? variants : undefined}
                    initial={animate ? "initial" : undefined}
                    animate={animate ? "animate" : undefined}
                    transition={
                        animate
                            ? {
                                duration: 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }
                            : undefined
                    }
                    style={{
                        backgroundSize: animate ? "400% 400%" : undefined,
                    }}
                    className={cn(
                        "absolute inset-0 rounded-3xl z-[1] will-change-transform",
                        "bg-[radial-gradient(circle_farthest-side_at_0_100%,hsl(var(--primary)),transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
                    )}
                />
            )}
            <div className={cn("relative z-10", classes.card, className)}>
                {children}
            </div>
        </motion.div>
    );
};

BackgroundGradient.displayName = "BackgroundGradient";
