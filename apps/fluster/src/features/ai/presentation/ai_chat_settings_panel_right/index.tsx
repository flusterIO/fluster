import { H4 } from "@fluster.io/dev";
import React from "react";

export const AiChatSettingsPanelRight = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div
                className={
                    "w-fit text-center flex flex-col justify-center items-center"
                }
            >
                <H4>Coming Soon</H4>
                <div className={"text-muted-foreground max-w-[540px] mt-4"}>
                    AI settings will be adustable here in an upcoming release. This
                    feature will be in place by August.
                </div>
            </div>
        </div>
    );
};
