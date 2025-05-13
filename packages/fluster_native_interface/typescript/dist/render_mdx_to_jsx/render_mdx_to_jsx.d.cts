import { CompileOptions } from '@mdx-js/mdx';

declare const mermaidConfig: {
    output: string;
    mermaid: {
        themeVariables: {
            darkMode: boolean;
            background: string;
            primaryColor: string;
            primaryTextColor: string;
            secondaryColor: string;
            secondaryTextColor: string;
            primaryBorderColor: string;
            tertiaryBorderColor: string;
            secondaryBorderColor: string;
            tertiaryColor: string;
            tertiaryTextColor: string;
            lineColor: string;
            noteBkgColor: string;
            noteTextColor: string;
        };
        theme: string;
    };
};
declare const getRemarkPlugins: () => CompileOptions["remarkPlugins"];
declare const parseMdxString: (content: string) => Promise<string>;

export { getRemarkPlugins, mermaidConfig, parseMdxString };
