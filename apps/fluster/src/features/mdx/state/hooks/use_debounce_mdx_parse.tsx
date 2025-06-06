"use client";
import { useEffect, useState, Fragment, useRef } from "react";
import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import * as devRuntime from "react/jsx-dev-runtime";
import type { MDXComponents, MDXContent, MDXModule } from "mdx/types";
import { parseMdxString } from "#/mdx/data/parse/mdx_to_jsx";
// import { getComponentMap } from "@ulld/component-map/client";
// import { useAppConfig } from "./useAppConfig";
//

const getComponentMap = (mdxContent: string): object => {
    console.log("mdxContent: ", mdxContent);
    return {};
};

const Content = ({
    MdxContentComponent,
    raw,
    className,
}: {
    MdxContentComponent: MDXContent;
    raw: string;
    className?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null!);
    /* useMathjaxBandaid(ref); */
    return (
        <div ref={ref} className={className}>
            <MdxContentComponent components={getComponentMap(raw) as MDXComponents} />
        </div>
    );
};

export const useDebounceMdxParse = (
    initialValue: string = "",
    debounceTimeout: number = 300
) => {
    const [value, setValue] = useState<string>(initialValue);
    const [hasParsed, setHasParsed] = useState(false);
    const [mdxModule, setMdxModule] = useState<MDXModule | null>(null);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const handleParse = async (_value: string) => {
        /* TODO: Add function param and modify this to add the ability to format mdx content with internal parser. */
        const compiled = await parseMdxString({
            content: _value,
        });
        const res = await run(compiled, {
            Fragment: Fragment,
            jsx: runtime.jsx,
            jsxs: runtime.jsxs,
            jsxDEV: devRuntime.jsxDEV,
            baseUrl: import.meta.url,
        });
        setMdxModule(res);
    };

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }
        if (hasParsed === false) {
            handleParse(value).catch(() => {
                console.error("An error occurred while parsing mdx content.");
            });
            setHasParsed(true);
        } else {
            setTimer(setTimeout(() => handleParse(value || ""), debounceTimeout));
        }
    }, [value]);

    const Component = ({ className }: { className?: string }) =>
        mdxModule ? (
            <Content
                className={className}
                MdxContentComponent={mdxModule.default}
                raw={value}
            />
        ) : (
            <></>
        );

    return {
        value,
        setValue,
        Component,
        isReady: Boolean(mdxModule),
    };
};
