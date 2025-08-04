import React from "react";
import clsx from "clsx";
import StoryOfUlldHeading from "./story_of_ulld_heading";
import PayPalLinkQr from "#/util_components/paypal_qr";
import Link from "next/link";

export const StoryOfFlusterSection = () => {
    return (
        <div
            className={clsx(
                "group/feature relative w-screen left-0 min-h-[calc(100vh-76px)] h-fit flex flex-col justify-start items-center gap-6 z-10"
            )}
        >
            <StoryOfUlldHeading
                heading="Just a minute..."
            /* heading="The story of Fluster" */
            />
            <div className="max-w-[min(768px,calc(100vw-4rem))] prose prose-invert">
                <h3 className="underline decoration-lime-500 underline-offset-2">
                    {"I'm homeless and I need your help."}
                </h3>
                <p>
                    {`I'm plopping this section in here out of place to try and grab your
          attention. This app is in it's final stages, but over the coming
          months while Fluster is in it's early days, I will follow an almost
          nightly release schedule.`}
                </p>
                <p>
                    {`This means that if you try Fluster early, hang in there... it will
          only get better. I'm releasing this app early, knowing that this might
          drive users away, but there is a very important reason for this...`}
                </p>
                <p>
                    {`After giving up my 9-5 to work on a modified model of relativity I
          became homeless. I've been homeless for more than 3 years now,
          spending every minute I had working towards this model, and in turn, Fluster. It was during
          this pursuit that I built a prior version of Fluster for my own
          personal use. Now that I'm wrapping up the final stages of Fluster's
          intial release, I can really use your help.`}
                </p>
                <p>
                    {`Summer is here, and this will be my third summer living in my car. If you can, please consider supporting the development of Fluster so
          maybe me and my puppy can get a hotel on the day's when it's`}
                    <span className="italic font-bold">{" really "}</span>
                    {
                        "hot. It is for this reason that much of this website remains unfinished, as I'm focusing on building the remaining 5% of the core application before I come back and migrate the documentation from the previous web based version of Fluster."
                    }
                </p>
                <p>
                    No matter my own situation, Fluster is now and will always be free for
                    anyone running it on their own system, no sign up required, ever.
                </p>
                <p>
                    You can visit the sponsor page <Link href={"/sponsor"}>here</Link>, or
                    go directly to Fluster&apos;s paypal account by scanning the QR code
                    below.
                </p>
            </div>
            <PayPalLinkQr size={120} />

            <p className="prose dark:prose-invert px-6 text-center">
                If you are hiring, consider taking a look at my resume available{" "}
                <Link className="text-primary" href="/resume">
                    here
                </Link>
            </p>
        </div>
    );
};

StoryOfFlusterSection.displayName = "StoryOfUlldSection";
