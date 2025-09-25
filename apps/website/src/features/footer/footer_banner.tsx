import React, { ReactNode } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

export interface FooterBannerProps {
    content: ReactNode;
    className?: string;
}

interface Props {
    initialDelay?: number;
    banners: FooterBannerProps[];
    inView: boolean;
}

type T = { item: FooterBannerProps; idx: number; initialDelay?: number } & Pick<
    Props,
    "initialDelay" | "inView"
>;

const Banner = ({ item, idx, initialDelay = 2.5 }: T) => {
    return (
        <motion.div
            className={clsx("text-sm text-center", item.className)}
            initial={{
                y: -100,
                opacity: 0,
            }}
            whileInView={{
                y: 1,
                opacity: 1,
            }}
            transition={{
                delay: initialDelay + idx * 0.15,
            }}
            viewport={{
                once: true,
            }}
        >
            {item.content}
        </motion.div>
    );
};

const FooterBanners = ({ banners, inView, initialDelay }: Props) => {
    return (
        <div
            className={
                "w-full flex flex-col justify-center items-center gap-4 text-sm max-w-[600px] text-gray-400 mt-4 mb-2"
            }
        >
            {banners.map((item, i) => (
                <Banner
                    item={item}
                    key={i}
                    idx={i}
                    inView={inView}
                    initialDelay={initialDelay}
                />
            ))}
        </div>
    );
};

FooterBanners.displayName = "FooterBanners";

export default FooterBanners;
