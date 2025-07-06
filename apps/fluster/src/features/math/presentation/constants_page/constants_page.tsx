import React, { useMemo, type ReactNode } from "react";
import { Constants, ConstantValue } from "@fluster.io/dev";
import { MdxContent } from "#/mdx/presentation/mdx_content";

export const ConstantsPage = (): ReactNode => {
    const data = useMemo(() => {
        let s = `| Key | Text | Value | Unit |
| --- | ---- | ----- | ---- |
`;
        Object.entries(new Constants()).map((c) => {
            const val = c[1] as ConstantValue;
            console.log("val: ", val);
            if ("unit" in val) {
                s += `| ${c[0]} | ${val.label} | ${val.value} | ${val.unit} |
`;
            }
        });
        return s;
    }, []);
    return (
        <div
            id="scroll-target"
            className="w-full h-full flex flex-col justify-center items-center overflow-y-auto overflow-x-hidden py-16"
        >
            <div className="w-[min(90%,1080px)] py-16">
                <MdxContent mdx={data} />
            </div>
        </div>
    );
};

ConstantsPage.displayName = "ConstantsPage";
