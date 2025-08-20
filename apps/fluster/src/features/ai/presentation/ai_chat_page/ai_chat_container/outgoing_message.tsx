import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { AiChatData } from "@/lib/bindings";
import React, { type ReactNode } from "react";

interface AiChatOutgoingMessageProps {
  data: AiChatData["messages"][number];
}

export const AiChatOutgoingMessage = ({
  data,
}: AiChatOutgoingMessageProps): ReactNode => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="float-left w-[min(1080px,calc(100%-4rem))] p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm border bg-primary text-primary-foreground">
        <InlineMdxContent mdx={data.body} />
      </div>
    </div>
  );
};

AiChatOutgoingMessage.displayName = "AiChatOutgoingMessage";
