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
            title: "We know math isn't for everyone...",
            body: "But we still need to set this up. Fluster stores all of it's data in your operating system's 'data' directory.",
        },
    },
    {
        sidebar: {
            title: "Whewww...",
            body: "We're all done! Make sure to checkout the documentation, and share this app to spread the word.",
        },
    },
];
