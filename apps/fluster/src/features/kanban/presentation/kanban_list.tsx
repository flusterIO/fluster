"use client"
import { type ReactNode } from "react";
import { motion } from "motion/react";
import KanbanCard from "./kanban_card";
import { LargeText } from "@/components/typography/typography";
import { KanbanListManager } from "../state/classes/kanban_list";

interface KanbanListlProps {
    item: KanbanListManager;
}

const KanbanList = ({ item }: KanbanListlProps): ReactNode => {
    return (
        <motion.div className="w-fit p-4 flex flex-col justify-start items-center gap-6">
            <LargeText>{item.label}</LargeText>
            {item.items.map((x) => (
                <KanbanCard item={x} key={x.id} />
            ))}
        </motion.div>
    );
};

KanbanList.displayName = "KanbanList";

export default KanbanList;
