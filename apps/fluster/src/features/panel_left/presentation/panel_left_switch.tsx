import React, { type ReactNode } from "react";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";

const connector = connect((state: AppState, props: any) => ({
  state: state.panelLeft,
  props: props,
}));

interface PanelLeftSwitchProps {
  state: AppState["panelLeft"];
}

const PanelLeftSwitch = connector((props: PanelLeftSwitchProps): ReactNode => {
  return <div>Panel Left Switch</div>;
});

PanelLeftSwitch.displayName = "PanelLeftSwitch";

export default PanelLeftSwitch;
