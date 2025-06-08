import React, { type ReactNode } from "react";
import { MdxContent, MdxContentProps } from "./mdx_content";

interface MdxTableCellProps extends MdxContentProps {
    mdx: string;
}

export const MdxTableCell = (props: MdxTableCellProps): ReactNode => {
    return <MdxContent className="[&>p]:m-0" {...props} />;
};

MdxTableCell.displayName = "MdxTableCell";
