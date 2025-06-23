import React from "react";

interface FeatureDescContainerProps {
    children: React.ReactNode;
}

export const FeatureDescContainer = (props: FeatureDescContainerProps) => {
    return (
        <div className={"w-full flex flex-col justify-center items-start gap-8"}>
            {props.children}
        </div>
    );
};

FeatureDescContainer.displayName = "FeatureDescContainer";
