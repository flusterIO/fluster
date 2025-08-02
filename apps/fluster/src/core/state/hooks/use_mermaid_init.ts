import { useDarkMode } from "@/hooks/use_dark_mode";
import { cssVariableToColor } from "@/lib/colors/hsl_variable_to_color";
import { useIsomorphicLayoutEffect } from "@fluster.io/dev";
import Color from "color";
import mermaid from "mermaid";

export const useMermaidInit = () => {
    const darkMode = useDarkMode();
    useIsomorphicLayoutEffect(() => {
        const primaryColor = cssVariableToColor("--primary") ?? Color("#0ba5e9");

        // const border = cssVariableToColor("--border");
        const background = cssVariableToColor("--background");
        // const secondary = cssVariableToColor("--secondary");
        // const secondaryForeground = cssVariableToColor("--secondary-foreground");
        // const primaryForeground = cssVariableToColor("--primary-foreground");
        const mutedForeground = cssVariableToColor("--muted-foreground");
        // console.log("primaryColor: ", primaryColor);
        mermaid.initialize({
            startOnLoad: true,
            darkMode,
            theme: "base",
            themeVariables: {
                // primaryColor: primaryColor.hex(),
                // primaryTextColor: primahryForeground?.hex(),
                background: background?.hex(),
                lineColor: mutedForeground?.hex(),
                actorLineColor: mutedForeground?.hex(),
                sequenceNumberColor: primaryColor?.hex(),
                // primaryBorderColor: border?.hex(),
                // secondaryColor: secondary?.hex(),
                // secondaryTextColor: secondaryForeground?.hex(),
            },
        });
    }, []);
};
