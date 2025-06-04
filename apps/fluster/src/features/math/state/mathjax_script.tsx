import { ResourceRoutes } from "#/router/data/app_routes";
import React, { type ReactNode } from "react";

const MathjaxScript = (): ReactNode => {
    return (
        <>
            <script src={ResourceRoutes.mathjax} async />
        </>
    );
};

MathjaxScript.displayName = "MathjaxScript";

export default MathjaxScript;
