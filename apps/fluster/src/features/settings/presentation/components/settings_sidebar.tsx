import { AppRoutes } from "#/router/data/app_routes";
import { CategoryId, settingPages } from "#/settings/data/setting_page_data";
import { cn } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router";

const DesktopSettingsSidebar = (): ReactNode => {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const activeCat = searchParams.get("category");
  const handleCategoryClick = (category_id: CategoryId): void => {
    searchParams.set("category", category_id.toString());
    nav(`${AppRoutes.settings}?${searchParams.toString()}`);
  };
  return (
    <div className="h-full w-[min(250px,25%)] flex flex-col justify-start items-start border-r py-8">
      <div className="text-sm text-muted-foreground mb-3 px-4 ">Categories</div>
      <div className="w-full flex flex-col justify-start items-start text-gray-800 dark:text-gray-200 px-2">
        {settingPages.map((x) => {
          const Icon = x.icon;
          return (
            <a
              role="button"
              key={x.category_id}
              onClick={() => handleCategoryClick(x.category_id)}
              className={cn(
                "w-full grid grid-cols-[2rem_1fr] place-items-center pl-2 pr-4 py-2 rounded",
                activeCat === x.category_id && "text-foreground bg-muted"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="ml-2 w-full">{x.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

DesktopSettingsSidebar.displayName = "DesktopSettingsSidebar";

export default DesktopSettingsSidebar;
