"use client";
import { cn } from "#/core/utils/cn";
import PreventSharpEdges from "#/util_components/prevent_sharp_edges";
import {
    useMotionValue,
    motion,
    useMotionTemplate,
    useInView,
} from "framer-motion";
import { useEffect, useRef } from "react";

export const HeroBackground = ({
    children,
    className,
    containerClassName,
}: {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const ref = useRef<HTMLDivElement>(null!);
    const inView = useInView(ref);
    const isInView = useRef<boolean>(true);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
        if (!currentTarget) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) {
            return;
        }
        mouseX.set(clientX - rect.left);
        mouseY.set(clientY - rect.top);
    };

    /* const scroll = useScroll() */

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.addEventListener("mousemove", handleMouseMove);
        };
        /* eslint-disable-next-line  --  */
    }, []);

    useEffect(() => {
        isInView.current = inView;
    }, [inView]);

    return (
        <div
            className={cn(
                "relative h-[40rem] flex items-center bg-background justify-center w-full group",
                containerClassName
            )}
            ref={ref}
        >
            <div className="absolute inset-0 bg-dot-thick-neutral-800  pointer-events-none" />
            <motion.div
                className="pointer-events-none bg-dot-thick-sky-500 absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
                    maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
                }}
            />
            <div className={cn("relative z-20", className)}>{children}</div>
            <PreventSharpEdges />
        </div>
    );
};
