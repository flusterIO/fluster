import React, { ComponentProps, type ReactNode } from "react";
import { PropagateLoader } from "react-spinners";

export const LoadingComponent = (
    props: ComponentProps<typeof PropagateLoader>
): ReactNode => {
    return <PropagateLoader color="hsl(var(--primary))" {...props} />;
};

const LoadingScreen = (): ReactNode => {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <LoadingComponent />
        </div>
    );
};

LoadingScreen.displayName = "LoadingScreen";

export default LoadingScreen;
