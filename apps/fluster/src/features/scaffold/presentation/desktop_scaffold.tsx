import React, { type ReactNode } from "react";

interface DesktopScaffoldProps { }

const DesktopScaffold = (props: DesktopScaffoldProps): ReactNode => {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="text-3xl">Desktop scaffold here</div>
        </div>
    );
};

DesktopScaffold.displayName = "DesktopScaffold";

export default DesktopScaffold;
