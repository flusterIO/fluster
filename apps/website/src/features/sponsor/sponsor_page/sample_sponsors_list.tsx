"use client";
import React, { useState } from "react";
import SponsorAvatar from "./sponsor_avatar";
import AddSponsorAvatar from "./add_sponsor_avatar";

const indices = [1, 2, 3, 4, 5, 6, 7, 8];

const SampleSponsorList = () => {
    const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
    return (
        <div className={"w-fit flex flex-col justify-center items-center"}>
            <div
                className={"flex flex-row flex-wrap justify-center items-center gap-4"}
            >
                {indices.map((i, idx) => (
                    <SponsorAvatar
                        key={`sponsor-${idx}`}
                        index={idx}
                        hoveredIndex={hoveredIndex}
                        avatarUrl={`/assets/sampleSponsors/${i}.jpg`}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    />
                ))}
                <AddSponsorAvatar />
            </div>
            <p className={"text-sm text-muted-foreground my-4"}>
                {
                    "Ok. There aren't any sponsors yet, but checkout these funny animals in the mean time."
                }
            </p>
        </div>
    );
};

SampleSponsorList.displayName = "SampleSponsorList";

export default SampleSponsorList;
