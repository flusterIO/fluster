import { H3 } from "@/components/typography/typography";
import { useDarkMode } from "@/hooks/use_dark_mode";
import { AppState } from "@/state/initial_state";
import { CodeBlock } from "@fluster.io/dev";
import { BookPlus } from "lucide-react";
import React, { type ReactNode } from "react";
import { connect } from "react-redux";

const connector = connect((state: AppState) => ({
    themes: state.code.theme,
}));

const NoDictionaryEntriesFound = connector(
    ({ themes }: { themes: AppState["code"]["theme"] }): ReactNode => {
        const darkMode = useDarkMode();
        return (
            <div className="w-full h-full min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-2">
                    <BookPlus className="w-16 h-16 text-primary" />
                    <H3>No dictionary entries found</H3>
                    <p>
                        You can add a dictionary entry in any mdx note using the following
                        syntax
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
