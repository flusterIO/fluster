import React, { type ReactNode } from "react";
import { DashboardStaticData } from "../data/models/dashboard_static_data";
import { Button, cn } from "@fluster.io/dev";
import { useNavigate } from "react-router";

interface QuickActionCardProps {
    item: DashboardStaticData["quickCreateItems"][number];
}

const QuickActionCard = ({ item }: QuickActionCardProps): ReactNode => {
    const navigate = useNavigate();
    return (
        <button
            className={
                "border rounded-lg py-2 flex flex-col justify-center items-center h-20 space-y-2 hover:bg-slate-200 dark:hover:bg-slate-800"
            }
            onClick={() => item.onClick(navigate)}
        >
            <div className={`rounded-lg p-2 ${item.color}`}>
                <item.icon className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs">{item.label}</span>
        </button>
    );
};

QuickActionCard.displayName = "QuickActionCard";

export default QuickActionCard;
