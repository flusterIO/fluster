import {
    Calculator,
    Code,
    FileText,
    Bookmark,
    Kanban,
    CheckSquare,
    BookOpen,
} from "lucide-react";
import { NavigateFunction } from "react-router";

export enum QuickActionId {
    viewEquations,
    viewSnippets,
    viewBibliography,
    viewBookmarks,
    vewTaskLists,
    viewKanbanBoards,
}

interface QuickCreateItem {
    id: QuickActionId;
    type: string;
    label: string;
    icon: typeof FileText;
    color: string;
    onClick: (nav: NavigateFunction) => void;
}

export interface DashboardStaticData {
    quickCreateItems: QuickCreateItem[];
}

export const dashboardStaticData: DashboardStaticData = {
    quickCreateItems: [
        {
            id: QuickActionId.viewBookmarks,
            type: "video",
            label: "Bookmarks",
            icon: Bookmark,
            color: "bg-blue-500",
            onClick: () => { },
        },
        {
            id: QuickActionId.viewEquations,
            type: "equation",
            label: "Equations",
            icon: Calculator,
            color: "bg-red-500",
            onClick: () => { },
        },
        {
            id: QuickActionId.viewSnippets,
            type: "code",
            label: "Snippets",
            icon: Code,
            color: "bg-green-500",
            onClick: () => { },
        },
        {
            id: QuickActionId.viewBibliography,
            type: "markdown",
            label: "Bibliography",
            icon: BookOpen,
            color: "bg-purple-500",
            onClick: () => { },
        },
        {
            id: QuickActionId.vewTaskLists,
            type: "table",
            label: "To-Do's",
            icon: CheckSquare,
            color: "bg-orange-500",
            onClick: () => { },
        },
        {
            id: QuickActionId.viewKanbanBoards,
            type: "image",
            label: "Kanban Boards",
            icon: Kanban,
            color: "bg-pink-500",
            onClick: () => { },
        },
    ],
};
