import React, { type ReactNode } from "react";
import PanelLeftSwitch from "./panel_left_switch";
import { Panel } from "react-resizable-panels";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";

const connector = connect((state: AppState, props: any) => ({
  open: state.panelLeft.open,
  props: props,
}));

interface Props {
  open: boolean;
}

const PanelLeftDesktop = connector(({ open }: Props): ReactNode => {
  return (
    <Panel
      defaultSize={200}
      aria-expanded={open}
      collapsedSize={0}
      collapsible={true}
      className="border-r h-full pt-8 pb-6 relative"
    >
      <PanelLeftSwitch />
    </Panel>
  );
});

PanelLeftDesktop.displayName = "PanelLeftDesktop";

export default PanelLeftDesktop;
