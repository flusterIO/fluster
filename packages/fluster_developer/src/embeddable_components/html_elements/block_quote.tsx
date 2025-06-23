import React, { HTMLProps, type ReactNode } from "react";

type BlockQuoteProps = HTMLProps<HTMLElement>;
export const BlockQuote = (props: BlockQuoteProps): ReactNode => {
    return (
        <div
            className="border-primary pl-2"
            style={{
                borderLeftWidth: "4px",
            }}
        >
            {props.children}
        </div>
    );
};

BlockQuote.displayName = "BlockQuote";
