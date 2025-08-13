import { AppRoutes } from "@fluster.io/dev";

const scrollTargetIdMap: Partial<{ [K in AppRoutes]: string }> = {
  [AppRoutes.bibliography]: "scroll-target-bib",
  [AppRoutes.taskLists]: "scroll-target-task-manager",
  [AppRoutes.htmlFile]: "scroll-target-html",
  [AppRoutes.settings]: "scroll-target-settings",
};

export const getScrollTarget = () => {
  const location = window.location.pathname;
  for (const k in scrollTargetIdMap) {
    if (k.startsWith(location)) {
      const em = document.getElementById(
        scrollTargetIdMap[k as keyof typeof scrollTargetIdMap] as string
      );
      if (em) {
        return em;
      }
    }
  }
  // Check if the 'with panels' scaffold is being used, and if it sn't default to the target without panels.
  return (
    document.getElementById("scroll-target-with-panels") ??
    document.getElementById("scroll-target")
  );
};
