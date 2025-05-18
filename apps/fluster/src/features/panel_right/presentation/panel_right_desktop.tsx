import React, { type ReactNode } from "react";
import PanelRightSwitch from "./panel_right_switch";
import { Panel } from "react-resizable-panels";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";

const connector = connect((state: AppState, props: any) => ({
  open: state.panelRight.open,
  props: props,
}));

interface PanelRightDesktopProps {
  open: boolean;
}

/* WITH_WIFI: Look up the docs for this collapsible panel. See how they collapsed it to zero width. */
const PanelRightDesktop = connector(
  ({ open }: PanelRightDesktopProps): ReactNode => {
    return (
      <Panel
        defaultSize={200}
        aria-expanded={open}
        collapsedSize={0}
        collapsible={true}
        className="border-l h-full pt-8 px-6 pb-6 relative origin-right"
      >
        <PanelRightSwitch />
      </Panel>
    );
  },
);

PanelRightDesktop.displayName = "PanelRightDesktop";

export default PanelRightDesktop;
