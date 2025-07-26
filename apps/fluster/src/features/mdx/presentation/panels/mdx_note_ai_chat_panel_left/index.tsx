import { H4 } from "@fluster.io/dev";
import React, { type ReactNode } from "react";

export const MdxNoteAiChatPanelLeft = (): ReactNode => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div
        className={
          "w-fit h-full text-center flex flex-col justify-center items-center px-4"
        }
      >
        <H4>Coming Soon</H4>
        <div className={"text-muted-foreground max-w-[540px] mt-4"}>
          An AI chat specific to your note will be available here in an upcoming
          release, so make sure to update often. While the remainder of this app
          is built, an update will be available almost nightly.
        </div>
      </div>
    </div>
  );
};

MdxNoteAiChatPanelLeft.displayName = "MdxNoteAiChatPanelLeft";
