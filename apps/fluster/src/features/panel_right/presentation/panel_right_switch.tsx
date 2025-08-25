import React, { useState, type ReactNode } from "react";
import { useRoutes, useSearchParams } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";
import SnippetsFilterPanel from "#/snippets/presentation/filter_snippets_panel/filter_snippets_panel";
import { MdxTocPanelRight } from "#/mdx/presentation/panels/toc_panel_right";
import { TaskDetailPanelRight } from "#/task_manager/presentation/task_detail_panel_right";
import { PdfPagePanelRight } from "#/pdf/presentation/pdf_page_panel_right";
import { EquationSearchPanelRight } from "#/math/presentation/equation_search_panel_right";
import { AiChatSettingsPanelRight } from "#/ai/presentation/ai_chat_settings_panel_right";
import { useEventListener } from "@fluster.io/dev";
import ModalBackdrop from "@/components/util/modal_backdrop";
import { useDispatch } from "react-redux";
import { setPanelRightOpen } from "../state/slice";
import { motion } from "motion/react";

const PanelRightSwitch = (): ReactNode => {
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const dispatch = useDispatch();
    const [sp, setSearchParams] = useSearchParams();
    const n = useRoutes([
        {
            path: AppRoutes.snippets,
            Component: SnippetsFilterPanel,
        },
        {
            path: AppRoutes.viewMdxNote,
            Component: MdxTocPanelRight,
        },
        {
            path: AppRoutes.taskLists,
            Component: TaskDetailPanelRight,
        },
        {
            path: AppRoutes.pdf,
            Component: PdfPagePanelRight,
        },
        {
            path: AppRoutes.equations,
            Component: EquationSearchPanelRight,
        },
        {
            path: AppRoutes.aiMainChat,
            Component: AiChatSettingsPanelRight,
        },
    ]);
    useEventListener("show-task-details", (e) => {
        sp.set("fi", e.detail.taskId);
        setSearchParams(sp);
        setShowTaskDetails(true);
        dispatch(setPanelRightOpen(true));
    });
    if (showTaskDetails) {
        return (
            <ModalBackdrop onClick={() => setShowTaskDetails(false)}>
                <motion.div
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className="fixed top-0 right-0 bottom-0 w-[min(90vw,450px)] h-screen float-right border-l px-6 pb-2 pt-8 !overflow-y-auto"
                    animate={showTaskDetails ? "show" : "hide"}
                    initial="hide"
                    variants={{
                        show: {
                            x: 0,
                            opacity: 1,
                        },
                        hide: {
                            opacity: 0,
                            x: "100%",
                        },
                    }}
                >
                    <TaskDetailPanelRight />
                </motion.div>
            </ModalBackdrop>
        );
    }
    return n;
};

PanelRightSwitch.displayName = "PanelRightSwitch";

export default PanelRightSwitch;
