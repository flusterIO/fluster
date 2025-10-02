import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { TextLogo } from "../logo/text_logo";

export const baseOptions: BaseLayoutProps = {
    nav: {
        title: <TextLogo className="max-w-[150px] h-fit max-h-[2rem]" />,
    },
};
