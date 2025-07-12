"use client";
import React from "react";
import cssIcon from "./css.svg";
import nextIcon from "./next.svg";
import rustIcon from "./rust.svg";
import reactIcon from "./react.svg";
import scssIcon from "./scss.svg";
import tailwindIcon from "./tailwind.svg";
import reduxIcon from "./redux.svg";
import typescriptIcon from "./typescript.svg";
import jupyterIcon from "./jupyter.svg";
import googleIcon from "./google.svg";
import googleCalIcon from "./googleCalendar.svg";
import latexIcon from "./latex.svg";
import mdxIcon from "./mdx.svg";
import shadIcon from "./shadcn.svg";
import NextImage from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
const Image = motion.create(NextImage);

export type TechIconType =
    | "next"
    | "react"
    | "ts"
    | "tailwind"
    | "css"
    | "scss"
    | "rust"
    | "redux"
    | "jupyter"
    | "googleCalendar"
    | "google"
    | "latex"
    | "shad"
    | "mdx";

const icons: { [k in TechIconType]: typeof cssIcon } = {
    next: nextIcon,
    rust: rustIcon,
    css: cssIcon,
    react: reactIcon,
    scss: scssIcon,
    tailwind: tailwindIcon,
    ts: typescriptIcon,
    redux: reduxIcon,
    jupyter: jupyterIcon,
    google: googleIcon,
    googleCalendar: googleCalIcon,
    latex: latexIcon,
    mdx: mdxIcon,
    shad: shadIcon,
};

const alt: { [k in TechIconType]: typeof cssIcon } = {
    next: "Next.js",
    rust: "Rust",
    css: "CSS",
    react: "React",
    scss: "SCSS",
    tailwind: "Tailwind",
    ts: "Typescript",
    redux: "Redux",
    jupyter: "Jupyter",
    latex: "Latex",
    mdx: "MDX",
    google: "Google",
    googleCalendar: "Google Calendar",
    shad: "shadcn",
};

const docs: { [k in TechIconType]: string } = {
    next: "https://nextjs.org/docs",
    rust: "https://www.rust-lang.org",
    css: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    react: "https://react.dev",
    scss: "https://sass-lang.com/documentation/",
    tailwind: "https://tailwindcss.com/docs/configuration",
    ts: "https://www.typescriptlang.org",
    redux: "https://redux.js.org",
    jupyter: "https://docs.jupyter.org/en/latest/",
    google:
        "https://developers.google.com/identity/protocols/oauth://developers.google.com/identity/protocols/oauth2/",
    googleCalendar:
        "https://developers.google.com/identity/protocols/oauth://developers.google.com/identity/protocols/oauth2/",
    latex:
        "https://www.latex-project.org/help/documentation://www.latex-project.org/help/documentation/",
    mdx: "https://mdxjs.com/docs://mdxjs.com/docs/",
    shad: "https://ui.shadcn.com/docs",
};

interface TechIconLinkProps {
    icon: TechIconType;
    className?: string;
    index: number;
    show: boolean;
}

export const TechIconLink = ({
    icon,
    className,
    show,
    index,
}: TechIconLinkProps) => {
    return (
        <motion.a
            href={docs[icon]}
            className={clsx(
                "relative tech-icon-link max-w-[80px] max-h-[80px]",
                className
            )}
            initial="hide"
            animate={show ? "show" : "hide"}
            variants={{
                show: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                        type: "spring",
                        delay: index * 0.1 + 0.75,
                    },
                },
                hide: {
                    opacity: 0,
                    scale: 0,
                },
            }}
        >
            <Image src={icons[icon]} alt={alt[icon]} />
        </motion.a>
    );
};

TechIconLink.displayName = "TechIconLink";
