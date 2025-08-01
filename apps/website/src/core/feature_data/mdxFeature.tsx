"use client";
import splitViewImg from "../../../public/assets/blog/screenshots/splitview.png";
import { FeaturedContainerPropsRequired } from "#/features/landing_page/sections/feature_section/types";
import Image from "next/image";
import { buttonVariants } from "../shad/ui/button";
import { staticContent } from "../static_content";

export const mdxFeature: FeaturedContainerPropsRequired = {
    label: "Write in MDX",
    title: "Markdown... Xtended",
    /* expandDisplay: true, */
    desc: () => {
        return (
            <div className={"w-full h-fit flex flex-col gap-4 md:gap-6"}>
                <div>
                    <span className={"text-primary font-semibold"}> Mdx </span>{" "}
                    {
                        "takes all of the simplicity of markdown and extends it to support React components directly in your notes. Plots, modals, whiteboards, and more are right at your fingertips, in a language that anyone can learn in a single day."
                    }
                </div>
                <div>
                    <a className={buttonVariants()} href={staticContent.links.videoDemo}>
                        Video Demo
                    </a>
                </div>
            </div>
        );
    },
    component: () => {
        return (
            <Image
                src={splitViewImg}
                alt="Fluster mdx & code editor split view"
                className={"w-full h-auto min-h-[40vh]"}
            />
        );
    },
};
