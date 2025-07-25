import { useDarkMode } from "@/hooks/use_dark_mode";
import { cn } from "@fluster.io/dev";
import React, { ComponentProps, type ReactNode } from "react";
import { PropagateLoader } from "react-spinners";

export const LoadingComponent = (
    props: ComponentProps<typeof PropagateLoader>
): ReactNode => {
    return <PropagateLoader color="hsl(var(--primary))" {...props} />;
};

const LoadingScreen = (): ReactNode => {
    const darkMode = useDarkMode();
    return (
        <div
            className={cn(
                "w-screen h-screen flex flex-col justify-center items-center bg-background",
                darkMode && "dark"
            )}
        >
            <LoadingComponent />
        </div>
    );
};

LoadingScreen.displayName = "LoadingScreen";

export default LoadingScreen;
