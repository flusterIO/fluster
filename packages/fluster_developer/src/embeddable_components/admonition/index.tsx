import React, { FC, useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import AdmonitionTitle from "./admonition_title";
import FoldableAdmonitionTitle from "./foldable_admonition_title";
import { AdmonitionTitleProps, AdmonitionVariant } from "./types";

export interface AdmonitionProps extends Omit<AdmonitionTitleProps, "type"> {
    type?: AdmonitionVariant;
    /// Start the admonition in a folded state.
    folded?: boolean;
    /// Whether or not to make the admonition foldable.
    foldable?: boolean;
    children: ReactNode;
    /// If sidebar is et to true, the admonition will not occupy the entire width unless the screen is narrow.
    sidebar?: boolean;
    /// InlineMdxContent are passed in automatically in the component map.
    InlineMdxContent: FC<{ mdx: string }>;
}

export const Admonition = ({
    folded,
    children,
    type = "info",
    foldable,
    title,
    sidebar,
    InlineMdxContent,
}: AdmonitionProps): ReactNode => {
    const [open, setOpen] = useState(foldable ? !folded : true);

    useEffect(() => {
        if (!foldable) {
            setOpen(true);
        }
    }, [foldable]);
    return (
        <motion.div
            initial={folded && foldable ? "folded" : "open"}
            animate={open ? "open" : "folded"}
            className={sidebar ? "w-full @[768px]/mdx:w-1/3" : undefined}
        >
            {foldable ? (
                <FoldableAdmonitionTitle
                    open={open}
                    setOpen={setOpen}
                    title={title}
                    type={type}
                >
                    <InlineMdxContent mdx={title} />
                </FoldableAdmonitionTitle>
            ) : (
                <AdmonitionTitle title={title} type={type}>
                    <InlineMdxContent mdx={title} />
                </AdmonitionTitle>
            )}
            <motion.div
                className="rounded-bl rounded-br border-l border-b border-r bg-card text-card-foreground"
                variants={{
                    folded: {
                        height: 0,
                        /* opacity: 0, */
                    },
                    open: {
                        height: "fit-content",
                        /* opacity: 1, */
                    },
                }}
                transition={{
                    bounce: 0,
                }}
            >
                <motion.div
                    variants={{
                        folded: {
                            y: "-100%",
                            opacity: 0,
                        },
                        open: {
                            y: 0,
                            opacity: 1,
                        },
                    }}
                    className="p-4 [&>p]:my-0"
                >
                    {children}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

Admonition.displayName = "Admonition";
