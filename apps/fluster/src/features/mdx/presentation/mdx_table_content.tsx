import React, { type ReactNode } from "react";
import { MdxContent, MdxContentProps } from "./mdx_content";

interface MdxTableCellProps extends MdxContentProps {
    mdx: string;
}

export const MdxTableCell = (props: MdxTableCellProps): ReactNode => {
    return (
        <MdxContent
            className="[&>p]:m-0 overflow-x-hidden inline-table"
            {...props}
        />
    );
};

MdxTableCell.displayName = "MdxTableCell";
