"use client";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { BackgroundGradientCard } from "./background_gradient_card";
import { cn } from "#/core/utils/cn";

interface SponsorLogoCardProps
    extends Omit<
        ComponentPropsWithoutRef<typeof BackgroundGradientCard>,
        "children" | "classes" | "title"
    > {
    logo: ReactNode;
    title: ReactNode;
    desc: ReactNode;
    href: string;
    isPrimary?: boolean;
    forceDescription?: boolean;
    classes?: ComponentPropsWithoutRef<
        typeof BackgroundGradientCard
    >["classes"] & {
        title?: string;
        desc?: string;
    };
}

export const SponsorLogoCard = ({
    logo,
    title,
    desc,
    href,
    isPrimary,
    forceDescription,
    classes = {},
    ...props
}: SponsorLogoCardProps) => {
    const router = useRouter();
    return (
        <BackgroundGradientCard
            {...props}
            classes={classes}
            className={clsx(
                "grid cursor-pointer grid-cols-[120px_1fr] gap-6 border place-items-center",
                isPrimary && "col-span-2"
            )}
            role="button"
            onClick={() => (href ? router.push(href) : {})}
        >
            <div
                className={"h-[80px] w-auto flex flex-col justify-center items-center"}
            >
                {logo}
            </div>
            <div className={"w-full flex flex-col justify-center items-start"}>
                <h3 className={cn("text-lg font-semibold", classes.title)}>{title}</h3>
                {(isPrimary || forceDescription) && (
                    <div className={cn("text-sm text-muted-foreground", classes.desc)}>
                        {desc}
                    </div>
                )}
            </div>
        </BackgroundGradientCard>
    );
};

SponsorLogoCard.displayName = "SponsorLogoCard";
