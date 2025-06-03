import PanelContainer from "@/components/util/panel_container";
import React, { type ReactNode } from "react";
import EquationsList from "../equations_list";

const EquationsPage = (): ReactNode => {
    return (
        <PanelContainer>
            <EquationsList />
        </PanelContainer>
    );
};

EquationsPage.displayName = "EquationsPage";

export default EquationsPage;
