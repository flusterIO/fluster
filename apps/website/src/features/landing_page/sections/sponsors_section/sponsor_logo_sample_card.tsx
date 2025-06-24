"use client";
import React from "react";
import clsx from "clsx";
import { SponsorLogoCard } from "./sponsor_logo_card";
import { FlusterIcon } from "#/core/logo/fluster_logo";

interface SponsorLogoSampleCardProps {
    isPrimary?: boolean;
}

const SponsorLogoSampleCard = ({ isPrimary }: SponsorLogoSampleCardProps) => {
    return (
        <SponsorLogoCard
            classes={{
                container: clsx("w-full", isPrimary ? "" : "lg:w-[calc(50%-1rem)]"),
                title: "text-3xl font-bold",
                card: "bg-[hsl(var(--card))]",
            }}
            isPrimary={isPrimary}
            logo={
                <FlusterIcon className="text-muted-foreground h-12 w-12 group-hover/sponsorContent:text-foreground transition-colors ease-in duration-500" />
            }
            title="Fluster"
            desc="This is a sample sponsor card. Replace one of these cards with your logo and a link to your site by clicking below."
            href="/sponsor"
        />
    );
};

SponsorLogoSampleCard.displayName = "SponsorLogoSampleCard";

export default SponsorLogoSampleCard;
