import React, { type ReactNode } from "react";

const LandingPageTitle = (): ReactNode => {
    return (
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            The Ultimate Note-Taking App for{" "}
            <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
                Students & Academics
            </span>
        </h1>
    );
};

LandingPageTitle.displayName = "LandingPageTitle";

export default LandingPageTitle;
