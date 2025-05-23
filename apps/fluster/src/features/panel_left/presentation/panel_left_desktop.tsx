import { type ReactNode } from "react";
import PanelLeftSwitch from "./panel_left_switch";
import { Panel, PanelResizeHandle } from "react-resizable-panels";
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
  if (!open) {
    return null;
  }
  return (
    <>
      <Panel
        id="panel-left"
        defaultSize={25}
        /* minSize={64} */
        order={1}
        className="border-r h-full pt-8 pb-6 relative !overflow-y-auto"
      >
        <PanelLeftSwitch />
      </Panel>
      <PanelResizeHandle />
    </>
  );
});

PanelLeftDesktop.displayName = "PanelLeftDesktop";

export default PanelLeftDesktop;
