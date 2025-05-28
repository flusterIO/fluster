"use client";
import mdxScreenshot from "../../../assets/screenshots/codeOutputPairs/differentiation/code.png";
import mdxScreenshotOutput from "./featureAssets/mdxScreenshotOutput.png";
import { ImageCarousel } from "#/features/image_carousel";
import { FeaturedContainerPropsRequired } from "#/features/landing_page/sections/feature_section/types";
import { Hint } from "@fluster.io/dev";

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
        <Hint>Click the image to view the output.</Hint>
      </div>
    );
  },
  component: () => {
    return (
      <ImageCarousel
        images={[
          {
            src: mdxScreenshot,
            alt: "MDX Code",
          },
          {
            src: mdxScreenshotOutput,
            alt: "MDX Output",
          },
        ]}
        className={"w-full h-auto min-h-[40vh]"}
      />
    );
  },
};
