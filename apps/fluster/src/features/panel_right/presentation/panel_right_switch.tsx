import React, { type ReactNode } from "react";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";

const connector = connect((state: AppState, props: any) => ({
  state: state.panelRight,
  props: props,
}));

interface PanelRightSwitchProps {
  state: AppState["panelRight"];
}

const PanelRightSwitch = connector(
  (props: PanelRightSwitchProps): ReactNode => {
    return <div>Panel right switch</div>;
  },
);

PanelRightSwitch.displayName = "PanelRightSwitch";

export default PanelRightSwitch;
