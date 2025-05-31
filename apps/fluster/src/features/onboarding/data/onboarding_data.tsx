import  { ReactNode } from "react";

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
];
