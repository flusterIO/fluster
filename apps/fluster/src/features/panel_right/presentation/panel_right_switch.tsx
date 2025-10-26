import { type ReactNode } from "react";
import { useRoutes } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";
import SnippetsFilterPanel from "#/snippets/presentation/filter_snippets_panel/filter_snippets_panel";
import { MdxTocPanelRight } from "#/mdx/presentation/panels/toc_panel_right";
import { TaskDetailPanelRight } from "#/task_manager/presentation/task_detail_panel_right";
import { PdfPagePanelRight } from "#/pdf/presentation/pdf_page_panel_right";
import { EquationSearchPanelRight } from "#/math/presentation/equation_search_panel_right";
import { AiChatSettingsPanelRight } from "#/ai/presentation/ai_chat_settings_panel_right";
import { CalendarPanelRight } from "#/calendar/presentation/calendar_page/calendar_panel_right";
import { NoteChatSidePanel } from "#/ai/presentation/note_chat_panel";
import { FlashcardPanelRightPlaceholder } from "#/flashcard/presentation/flashcard_panel_right/placeholder";

const PanelRightSwitch = (): ReactNode => {
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
        {
            path: AppRoutes.calendar,
            Component: CalendarPanelRight,
        },
        {
            path: AppRoutes.hello_world,
            Component: NoteChatSidePanel,
        },
        {
            path: AppRoutes.flashcard,
            Component: FlashcardPanelRightPlaceholder,
        },
    ]);
    return n;
};

PanelRightSwitch.displayName = "PanelRightSwitch";

export default PanelRightSwitch;
