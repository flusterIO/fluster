import { ResourceRoutes } from "#/router/data/app_routes";
import React, { type ReactNode } from "react";

export const MathjaxConfigScript = () => {
    return (
        <script type="text/x-mathjax-config" id="mathjax-settings">
            {`window.MathJax = {
 "HTML-CSS": {linebreaks: { automatic: true }},
  tex: {
    inlineMath: [['$', '$']]
  },
  menuSettings: {
    autocollapse: true
  },
  chtml: {
    minScale: 0.2,
    fontURL: "${ResourceRoutes.mathjaxFonts}",
  }
}`}
        </script>
    );
};

const MathjaxScript = (): ReactNode => {
    window.MathJax = {
        /* @ts-expect-error -- Not sure if this is working but I'm leaving it until all math is rendering properly. */
        "HTML-CSS": { linebreaks: { automatic: true } },
        tex: {
            inlineMath: [["$", "$"]],
        },
        menuSettings: {
            autocollapse: true,
        },
        chtml: {
            minScale: 0.2,
            fontURL: ResourceRoutes.mathjaxFonts,
        },
    };
    return (
        <>
            <MathjaxConfigScript />
            <script src={ResourceRoutes.mathjax} async />
        </>
    );
};

MathjaxScript.displayName = "MathjaxScript";

export default MathjaxScript;
