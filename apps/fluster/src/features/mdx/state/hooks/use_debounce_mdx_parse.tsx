"use client";
import React, { useEffect, useState, Fragment, HTMLProps } from "react";
import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import * as devRuntime from "react/jsx-dev-runtime";
import type { MDXModule } from "mdx/types";
import { parseMdxString } from "#/mdx/data/parse/mdx_to_jsx";
import { ParsedMdxContent } from "#/mdx/presentation/parsed_mdx_content";

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
        console.log("_value: ", _value);
        try {
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
            if (res) {
                setMdxModule(res);
            }
        } catch (err) {
            console.warn(`Error: ${err}`);
        }
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
        /* eslint-disable-next-line  --  */
    }, [value]);

    const Component = (props: HTMLProps<HTMLDivElement>) =>
        mdxModule ? (
            <ParsedMdxContent
                {...props}
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
