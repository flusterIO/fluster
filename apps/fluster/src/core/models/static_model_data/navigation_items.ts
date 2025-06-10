import { ComponentType } from "react";
import { NavigationItem, NavItemPosition } from "../navigation_item";
import {
  IconHome,
  IconBook2,
  IconCode,
  IconSettings2,
  IconAbc,
  IconBox,
  IconMath,
} from "@tabler/icons-react";
import { AppRoutes } from "#/router/data/app_routes";
import { Bookmark, CheckIcon, LucideBubbles } from "lucide-react";

export const globalNavigationItems = (): NavigationItem[] => {
  return [
    new NavigationItem(
      "Dashboard",
      AppRoutes.dashboard,
      IconHome as ComponentType<{ className: string }>,
      NavItemPosition.top
    ),
    new NavigationItem(
      "AI Chat",
      AppRoutes.aiChat,
      LucideBubbles as ComponentType<{ className: string }>,
      NavItemPosition.top
    ),
    new NavigationItem(
      "Bibliography",
      AppRoutes.bibliography,
      IconBook2 as ComponentType<{ className: string }>,
      NavItemPosition.top
    ),
    new NavigationItem(
      "Bookmarks",
      AppRoutes.bookmarks,
      Bookmark as ComponentType<{ className: string }>,
      NavItemPosition.hidden
    ),
    new NavigationItem(
      "To Do's",
      AppRoutes.taskLists,
      CheckIcon as ComponentType<{ className: string }>,
      NavItemPosition.hidden
    ),
    new NavigationItem(
      "Dictionary",
      AppRoutes.dictionary,
      IconAbc as ComponentType<{ className: string }>,
      NavItemPosition.top
    ),
    new NavigationItem(
      "Snippets",
      AppRoutes.snippets,
      IconCode as ComponentType<{ className: string }>,
      NavItemPosition.top
    ),
    new NavigationItem(
      "Equations",
      AppRoutes.equations,
      IconMath as ComponentType<{ className: string }>,
      NavItemPosition.top
    ),
    new NavigationItem(
      "Kanban Boards",
      AppRoutes.kanbanBoards,
      IconBox as ComponentType<{ className: string }>,
      NavItemPosition.top
    ),
    new NavigationItem(
      "Settings",
      AppRoutes.settings,
      IconSettings2 as ComponentType<{ className: string }>,
      NavItemPosition.bottom
    ),
  ];
};
