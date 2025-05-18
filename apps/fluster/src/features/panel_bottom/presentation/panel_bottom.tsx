import React, { type ReactNode } from "react";
import { Panel } from "react-resizable-panels";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";

const connector = connect((state: AppState, props: any) => ({
  state: state.panelBottom,
  props: props,
}));

interface PanelBottomProps {
  state: AppState["panelBottom"];
}

const PanelBottom = connector(({ state }: PanelBottomProps): ReactNode => {
  if (state.open === false) {
    return null;
  }
  return (
    <Panel
      defaultSize={200}
      collapsible={true}
      collapsedSize={0}
      aria-expanded={state.open}
    >
      Bottom panel
    </Panel>
  );
});

PanelBottom.displayName = "PanelBottom";

export default PanelBottom;
