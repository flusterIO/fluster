import { useEffect, type ReactNode } from "react";
import { useDebounceMdxParse } from "../state/hooks/use_debounce_mdx_parse";

interface MdxContentProps {
    mdx: string;
    className?: string;
}

const MdxContent = ({ mdx, className }: MdxContentProps): ReactNode => {
    const { Component, setValue } = useDebounceMdxParse();
    useEffect(() => {
        setValue(mdx);
    }, [mdx]);
    return <Component className={className} />;
};

MdxContent.displayName = "MdxContent";

export default MdxContent;
