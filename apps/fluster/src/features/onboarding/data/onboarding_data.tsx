import { ReactNode } from "react";

interface OnBoardingPageData {
    sidebar: {
        title: ReactNode;
        body: ReactNode;
    };
}

export const onBoardingPageData: OnBoardingPageData[] = [
    {
        sidebar: {
            title: "You're just a few clicks away...",
            body: "We just have to setup a few things before you can get to work on changing the world.",
        },
    },
    {
        sidebar: {
            title: "Help us find your notes",
            body: "Please provide a directory where you intend to keep your notes.",
        },
    },
    {
        sidebar: {
            title: "Wait... this important",
            body: "Just a little information about how you can get Fluster to take advantage of 100% local AI.",
        },
    },
    {
        sidebar: {
            title: "Whewww...",
            body: "We're all done! Make sure to checkout the documentation, and share this app to spread the word.",
        },
    },
];
