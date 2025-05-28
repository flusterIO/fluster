"use client";
import { FeatureDescContainer } from "#/features/landing_page/sections/feature_section/feature_desc_container";
import { FeaturedContainerPropsRequired } from "#/features/landing_page/sections/feature_section/types";
import Link from "next/link";
import { staticContent } from "../static_content";
import { buttonVariants } from "@fluster.io/dev";
import { slideShowScreenshots } from "./featureAssets/slideShowScreenshots";
import { LogoAsText } from "../logo/logo_as_text";
import { ImageCarousel } from "#/features/image_carousel";
/* TODO: Come back here and animate this image again. It's currently just swapping without any transition at all. */
/* TODO: Make those images scroll while the description stays fixed when it's flex-row, similar to Vercel's page with that stationary box on the left. */

export const corePluginsFeature: FeaturedContainerPropsRequired = {
  label: "Built to quantize gravity",
  title: "Applicable Everywhere",
  expandDisplay: true,
  displayContainerClasses: "pt-0 md:pt-4 min-h-[30vh]",
  desc: () => {
    return (
      <FeatureDescContainer>
        <span>
          <LogoAsText fontSize={18} />
          {
            "was built by a single developer with a background in physics to handle his own research after becoming frustrated with other options. There's out of the box support for equations, snippets, bibliography management, task lists, whiteboards, and much,"
          }
          <em>much</em> more.
        </span>
        <Link
          className={buttonVariants({})}
          href={staticContent.links.demos.myNotes}
        >
          His Notes
        </Link>
      </FeatureDescContainer>
    );
  },
  component: () => {
    return (
      <ImageCarousel
        images={slideShowScreenshots}
        withButtons
        buttonsBottom
        className={"w-full h-auto min-h-[40vh]"}
        classes={{
          buttonContainer: "justify-center lg:justify-end",
        }}
      />
    );
  },
};
