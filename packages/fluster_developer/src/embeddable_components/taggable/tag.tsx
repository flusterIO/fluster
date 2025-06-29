import React, { type ReactNode } from "react";
import { AppRoutes } from "../../types/app_routes";

interface TagProps {
  value: string;
}

export const Tag = ({ value }: TagProps): ReactNode => {
  const sp = new URLSearchParams();
  sp.set("by_tag", value);

  return (
    <a
      href={`${AppRoutes.search}?${sp.toString()}`}
      className="bg-primary text-primary-foreground no-underline p-1 rounded cursor-pointer"
    >
      <span>#</span>
      {value}
    </a>
  );
};

Tag.displayName = "Tag";
