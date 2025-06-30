import { H3 } from "@/components/typography/typography";
import { AppRoutes } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { NavLink } from "react-router";

export const NoJupyterTokenBanner = (): ReactNode => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <H3>No Token Found</H3>
      <p>
        For more information, please see the{" "}
        <NavLink
          className="text-primary"
          to={`${AppRoutes.embeddedDocs}/${encodeURI("JupyterSetup")}`}
        >
          setting up jupyter
        </NavLink>{" "}
        documentation.
      </p>
    </div>
  );
};

NoJupyterTokenBanner.displayName = "NoTokenBanner";
