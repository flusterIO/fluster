import { ReactNode } from "react";
import { staticContent } from "#/core/static_content";
import { LinkProps } from "next/link";

export interface FooterBannerProps {
    content: ReactNode;
    className?: string;
}

export type FooterLinkKeys = "docs" | "demos" | "funding";

interface LinkGroupItem extends LinkProps {
    label: ReactNode;
    noLink?: boolean;
}

export type LinkGroupItems = LinkGroupItem[];

export const footerLinks: Record<FooterLinkKeys, LinkGroupItems> & {
    banners?: FooterBannerProps[];
} = {
    banners: [],
    demos: [
        {
            href: "/",
            label: "Coming Soon",
        },
    ],
    docs: [
        {
            href: staticContent.links.docs.internal.userHome,
            label: "Users",
        },
        {
            href: staticContent.links.comingSoon,
            label: "Developers",
        },
        {
            href: staticContent.links.comingSoon,
            label: "Teachers",
        },
    ],
    funding: [
        {
            href: staticContent.links.sponsor,
            label: "Paypal",
        },
        {
            href: staticContent.links.sponsor,
            label: "Patreon",
        },
        /* { */
        /*     onClick: () => { */
        /*         store.dispatch(showContactMeModal(true)); */
        /*     }, */
        /*     to: "", */
        /*     noLink: true, */
        /*     label: "Contact Me", */
        /* }, */
    ],
};
