import PanelContainer from "@/components/util/panel_container";
import React, { type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { EmbeddedDocsByFilePath } from "../embedded_docs_by_fs_path";
import {
    componentDocItems,
    ComponentDocsEntry,
} from "#/embedded_docs/data/component_docs";
import { AppRoutes } from "@fluster.io/dev";

const ComponentDocItemCard = ({
    item,
}: {
    item: ComponentDocsEntry;
}): ReactNode => {
    const nav = useNavigate();
    return (
        <div
            onClick={() => {
                const sp = new URLSearchParams();
                sp.set("fsPath", item.fp);
                nav(`${AppRoutes.embeddedDocs}?${sp.toString()}`);
            }}
            role="button"
            className="w-full h-full flex flex-col justify-center items-center rounded border py-16 hover:bg-muted transition-colors duration-300 cursor-pointer"
        >
            <div className="text-2xl font-bold">{item.label}</div>
        </div>
    );
};

const EmbeddedDocsDashboardPage = (): ReactNode => {
    const [searchParams] = useSearchParams();
    const filePath = searchParams.get("fsPath");
    if (filePath) {
        return <EmbeddedDocsByFilePath filePath={filePath} />;
    }
    return (
        <PanelContainer>
            <div className="grid grid-cols-1 @[450px]/panel:grid-cols-2 @[640px]/panel:grid-cols-3 gap-6 px-8 py-16">
                {componentDocItems.map((c) => {
                    return <ComponentDocItemCard item={c} key={`doc-${c.fp}`} />;
                })}
            </div>
        </PanelContainer>
    );
};

EmbeddedDocsDashboardPage.displayName = "EmbeddedDocsDashboardPage";

export default EmbeddedDocsDashboardPage;
