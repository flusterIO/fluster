import { type ReactNode } from "react";
import PanelRightSwitch from "./panel_right_switch";
import { Panel, PanelResizeHandle } from "react-resizable-panels";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";

const connector = connect((state: AppState, props: any) => ({
  open: state.panelRight.open,
  props: props,
}));

interface PanelRightDesktopProps {
  open: boolean;
}

const PanelRightDesktop = connector(
  ({ open }: PanelRightDesktopProps): ReactNode => {
    if (!open) {
      return null;
    }
    return (
      <>
        <PanelResizeHandle />
        <Panel
          id="panel-right"
          defaultSize={25}
          /* minSize={64} */
          order={3}
          className="border-l h-full pt-8 px-6 pb-6 relative origin-right !overflow-y-auto"
        >
          <PanelRightSwitch />
        </Panel>
      </>
    );
  },
);

PanelRightDesktop.displayName = "PanelRightDesktop";

export default PanelRightDesktop;
