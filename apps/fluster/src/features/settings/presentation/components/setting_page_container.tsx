import React, { HTMLProps, type ReactNode } from "react";

interface SettingPageContainerProps
    extends Omit<HTMLProps<HTMLFormElement>, "className"> {
    children: ReactNode;
}

export const SettingPageContainer = ({
    children,
    ...props
}: SettingPageContainerProps): ReactNode => {
    return (
        <form
            {...props}
            className="space-y-6 w-full flex flex-col justify-center items-cemter"
        >
            <div className="w-[min(768px,90%)] space-y-6 ml-auto mr-auto">
                {children}
            </div>
        </form>
    );
};

SettingPageContainer.displayName = "SettingPageContainer";
