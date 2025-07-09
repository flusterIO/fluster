import { H4 } from "@fluster.io/dev";
import { SharedTaggableModel } from "@/lib/bindings";
import { AppRoutes, Badge } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { useNavigate } from "react-router";

interface SingleTaggableProps {
  item?: SharedTaggableModel | null;
  taggable: "Topic" | "Subject";
}

export const SingleTaggable = ({
  item,
  taggable,
}: SingleTaggableProps): ReactNode => {
  const nav = useNavigate();
  if (!item) {
    return null;
  }
  return (
    <div className="w-full">
      <H4>{taggable}</H4>
      <div className="w-full mt-2 mb-4 flex flex-row justify-start items-center gap-2 flex-wrap">
        <Badge
          className="cursor-pointer"
          onClick={() => {
            const sp = new URLSearchParams();
            sp.set(
              taggable === "Subject" ? "by_subject" : "by_topic",
              item.value
            );
            nav(`${AppRoutes.search}?${sp.toString()}`);
          }}
        >
          {item.value}
        </Badge>
      </div>
    </div>
  );
};

SingleTaggable.displayName = "SingleTaggable";
