import ModalBackdrop from "@/components/util/modal_backdrop";
import React, { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { TaskDetailPanelRight } from "../task_detail_panel_right";
import { useEventListener } from "@fluster.io/dev";
import { useSearchParams } from "react-router";

export const TaskDetailSideDrawer = (): ReactNode => {
    const [showTaskDetails, setShowTaskDetails] = useState(false);

    const [sp, setSearchParams] = useSearchParams();
    useEventListener("show-task-details", (e) => {
        sp.set("fi", e.detail.taskId);
        setSearchParams(sp);
        setShowTaskDetails(true);
    });

    return (
        <ModalBackdrop
            hide={!showTaskDetails}
            onClick={() => setShowTaskDetails(false)}
        >
            <motion.div
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                className="bg-card fixed top-0 right-0 bottom-0 w-[min(90vw,450px)] h-screen float-right border-l px-6 pb-2 pt-8 !overflow-y-auto"
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
};

TaskDetailSideDrawer.displayName = "TaskDetailSideDrawer";
