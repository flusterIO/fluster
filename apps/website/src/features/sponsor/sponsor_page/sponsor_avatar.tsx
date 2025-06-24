import { cn } from "#/core/utils/cn";
import Image, { ImageProps } from "next/image";
import React from "react";

interface SponsorAvatarProps extends Omit<ImageProps, "src" | "alt"> {
    avatarUrl: string;
    index: number;
    hoveredIndex: number | null;
}

const indexBasedClasses = [
    "scale-[1.4] object-[0px_-20px]",
    "",
    "object-top",
    "",
    "object-[-23px_0px]",
    "object-[0px_0px]",
    "object-[0px_0px]",
    "",
];

const SponsorAvatar = ({
    avatarUrl,
    index,
    hoveredIndex,
    ...props
}: SponsorAvatarProps) => {
    return (
        <div className={cn("rounded-full w-16 h-16 overflow-hidden")}>
            <Image
                {...props}
                src={avatarUrl}
                priority
                className={cn(
                    "rounded-full w-16 h-16 object-cover transition-opacity duration-300",
                    props.className,
                    indexBasedClasses[index],
                    Boolean(typeof hoveredIndex === "number" && hoveredIndex !== index) &&
                    "opacity-80"
                )}
                alt="ULLD Sponsor"
                width={200}
                height={200}
            />
        </div>
    );
};

SponsorAvatar.displayName = "SponsorAvatar";

export default SponsorAvatar;
