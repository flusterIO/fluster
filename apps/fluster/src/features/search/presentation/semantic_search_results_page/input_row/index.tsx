import { onEnter } from "@/events/on_enter";
import { AppRoutes, Input } from "@fluster.io/dev";
import { SearchIcon } from "lucide-react";
import React, { useState, type ReactNode } from "react";
import { useNavigate } from "react-router";

export const SemanticSearchInputRow = (): ReactNode => {
  const [value, setValue] = useState("");
  const nav = useNavigate();
  return (
    <div className="w-full flex flex-row justify-between items-center gap-4 relative">
      <SearchIcon className="absolute left-3 top-[50%] translate-y-[-50%] text-foreground/80 w-4 h-4" />
      <Input
        className="w-full pr-3 pl-10 py-4"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) =>
          onEnter(
            e,
            (e) => {
              const query = (e.target as HTMLInputElement).value;
              const sp = new URLSearchParams();
              sp.set("query", query);
              nav(`${AppRoutes.semanticSearch}?${sp.toString()}`);
              setValue("");
            },
            "onEnter"
          )
        }
      />
    </div>
  );
};

SemanticSearchInputRow.displayName = "SemanticSearchInputRow";
