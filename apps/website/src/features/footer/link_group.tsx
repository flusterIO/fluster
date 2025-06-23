import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

interface LinkGroupItem extends LinkProps {
    label: ReactNode;
    noLink?: boolean;
}

export type LinkGroupItems = LinkGroupItem[];

interface LinkGroupProps {
    items: LinkGroupItems;
    title: string;
    idx: number;
    inView: boolean;
}

const LinkGroup = ({ items, title, inView, idx }: LinkGroupProps) => {
    const initialDelay = idx * 0.45;
    return (
        <div
            className={
                "w-fit h-fit flex flex-col justify-center items-center sm:justify-start sm:items-start"
            }
        >
            <motion.h4
                className={"text-lg capitalize"}
                animate={inView ? "show" : "hide"}
                variants={{
                    show: {
                        top: 0,
                        opacity: 1,
                        scale: 1,
                    },
                    hide: {
                        top: -50,
                        opacity: 0,
                        scale: 0,
                    },
                }}
                transition={{
                    delay: initialDelay,
                }}
            >
                {title}
            </motion.h4>
            <div
                className={
                    "flex flex-col justify-center items-center sm:items-start gap-2"
                }
            >
                {items.map((itemProps, itemIndex) => {
                    if (itemProps.noLink) {
                        return (
                            <motion.a
                                onClick={itemProps.onClick}
                                href={
                                    itemProps.href === "" ? undefined : (itemProps.href as string)
                                }
                                key={itemIndex}
                                animate={inView ? "show" : "hide"}
                                variants={{
                                    show: {
                                        opacity: 1,
                                        scale: 1,
                                    },
                                    hide: {
                                        opacity: 0,
                                        scale: 0,
                                    },
                                }}
                                transition={{
                                    delay: initialDelay + (itemIndex + 1) * 0.1,
                                }}
                                className="cursor-pointer text-sm text-gray-400 hover:text-gray-300 text-center sm:text-left transition-colors duration-300"
                            >
                                {itemProps.label}
                            </motion.a>
                        );
                    }
                    return (
                        <MotionLink
                            {...itemProps}
                            key={itemIndex}
                            animate={inView ? "show" : "hide"}
                            variants={{
                                show: {
                                    opacity: 1,
                                    scale: 1,
                                },
                                hide: {
                                    opacity: 0,
                                    scale: 0,
                                },
                            }}
                            transition={{
                                delay: initialDelay + (itemIndex + 1) * 0.1,
                            }}
                            className="text-sm text-gray-400 hover:text-gray-300 text-center sm:text-left transition-colors duration-300"
                        >
                            {itemProps.label}
                        </MotionLink>
                    );
                })}
            </div>
        </div>
    );
};

LinkGroup.displayName = "LinkGroup";

export default LinkGroup;
