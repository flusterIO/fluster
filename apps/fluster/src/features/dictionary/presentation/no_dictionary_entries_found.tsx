import { H3 } from "@/components/typography/typography";
import { useDarkMode } from "@/hooks/use_dark_mode";
import { AppState } from "@/state/initial_state";
import { CodeBlock } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { connect } from "react-redux";

const connector = connect((state: AppState, props: any) => ({
    themes: state.code.theme,
    props: props,
}));

const NoDictionaryEntriesFound = connector(
    ({ themes }: { themes: AppState["code"]["theme"] }): ReactNode => {
        const darkMode = useDarkMode();
        return (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="flex flex-col justfiy-center items-center gap-2">
                    <H3>No dictionary entries found</H3>
                    <p>
                        You can add a dictionary in any mdx note using the following syntax
                    </p>
                    <CodeBlock
                        className="mt-8"
                        themes={themes}
                        darkMode={darkMode}
                        lang={"mdx"}
                        code={`\`\`\`dictionary - My Entry \n# My title 
> You can use any mdx you want inside of here.
This will be saved to your dictionary as "My Entry". 
With _this_ mdx as the body.
\`\`\``}
                    />
                </div>
            </div>
        );
    }
);

NoDictionaryEntriesFound.displayName = "NoDictionaryEntriesFound";

export default NoDictionaryEntriesFound;
