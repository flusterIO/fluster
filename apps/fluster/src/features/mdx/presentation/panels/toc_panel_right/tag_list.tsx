import { H4 } from "@fluster.io/dev";
import { SharedTaggableModel } from "@/lib/bindings";
import { AppRoutes, Badge } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { useNavigate } from "react-router";

interface MdxTocPanelTagListProps {
  tags: SharedTaggableModel[];
}

export const MdxTocPanelTagList = ({
  tags,
}: MdxTocPanelTagListProps): ReactNode => {
  const nav = useNavigate();
  if (tags.length === 0) {
    return null;
  }
  return (
    <div className="w-full">
      <H4>Tags</H4>
      <div className="w-full mt-2 mb-4 flex flex-row justify-start items-center gap-2 flex-wrap">
        {tags
          .sort((a, b) => (a.value < b.value ? -1 : 1))
          .map((t) => {
            return (
              <Badge
                className="cursor-pointer"
                key={`tag-${t.value}`}
                onClick={() => {
                  const sp = new URLSearchParams();
                  sp.set("by_tag", t.value);
                  nav(`${AppRoutes.search}?${sp.toString()}`);
                }}
              >
                {t.value}
              </Badge>
            );
          })}
      </div>
    </div>
  );
};

MdxTocPanelTagList.displayName = "MdxTocPanelTagList";
