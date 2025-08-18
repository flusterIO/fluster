import { MdxContent } from "#/mdx/presentation/mdx_content";
import { showToast } from "#/toast_notification/data/events/show_toast";
import { AiChatData } from "@/lib/bindings";
import { copyStringToClipboard } from "@/lib/copy_string_to_clipboard";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuTrigger,
} from "@fluster.io/dev";
import React, { type ReactNode } from "react";

interface AiChatIncomingMessageProps {
  data: AiChatData["messages"][number];
}

export const AiChatIncomingMessage = ({
  data,
}: AiChatIncomingMessageProps): ReactNode => {
  const handleCopy = async (): Promise<void> => {
    const res = await copyStringToClipboard(data.body);
    if (res) {
      showToast({
        title: "Success",
        body: "The message was copied to your clipboard.",
        duration: 3000,
        variant: "Success",
      });
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="w-[min(1080px,calc(100%-4rem))] p-4 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm border bg-card">
            <MdxContent debounceTimeout={25} mdx={data.body} />
          </div>
        </ContextMenuTrigger>
        <ContextMenuPortal>
          <ContextMenuContent>
            <ContextMenuGroup>
              <ContextMenuItem
                className="text-foreground"
                onClick={() => handleCopy()}
              >
                Copy
              </ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenuPortal>
      </ContextMenu>
    </div>
  );
};

AiChatIncomingMessage.displayName = "AiChatIncomingMessage";
