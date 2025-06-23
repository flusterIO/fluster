import PanelContainer from "@/components/util/panel_container";
import React, { type ReactNode } from "react";
import EquationsList from "../equations_list";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import EquationPreview from "../equation_preview/index";

const connector = connect((state: AppState) => ({
    panelLeftOpen: state.panelLeft.open,
}));

const EquationsPage = connector(
    ({ panelLeftOpen }: { panelLeftOpen: boolean }): ReactNode => {
        return (
            <PanelContainer>
                {panelLeftOpen ? <EquationPreview /> : <EquationsList />}
            </PanelContainer>
        );
    }
);

EquationsPage.displayName = "EquationsPage";

export default EquationsPage;
