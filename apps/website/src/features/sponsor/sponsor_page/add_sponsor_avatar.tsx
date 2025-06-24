"use client";
import { PatreonIcon } from "#/core/icons/patreon";
import { PaypalIcon } from "#/core/icons/paypal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "#/core/shad/ui/dropdown-menu";
import { staticContent } from "#/core/static_content";
import { GithubIcon, PlusIcon } from "lucide-react";
import React from "react";

const itemClasses =
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground";

const AddSponsorAvatar = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className={
                        "rounded-full border bg-secondary text-secondary-foreground w-16 h-16 flex justify-center items-center cursor-pointer"
                    }
                >
                    <PlusIcon />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <a className={itemClasses} href={staticContent.links.fund.github}>
                    <GithubIcon className="mr-2 h-4 w-4" />
                    <span>Github</span>
                </a>
                <a href={staticContent.links.fund.patreon} className={itemClasses}>
                    <PatreonIcon className="mr-2 h-4 w-4 fill-secondary-foreground" />
                    <span>Patreon</span>
                </a>
                <a href={staticContent.links.fund.paypalDonate} className={itemClasses}>
                    <PaypalIcon className="mr-2 h-4 w-4 fill-secondary-foreground" />
                    <span>Paypal</span>
                </a>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

AddSponsorAvatar.displayName = "AddSponsorAvatar";

export default AddSponsorAvatar;
