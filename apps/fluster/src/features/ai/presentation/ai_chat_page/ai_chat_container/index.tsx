import React, { useEffect, useMemo, useRef, type ReactNode } from "react";
import { AiChatInput } from "./input";
import { AiChatMessageList } from "./messages";
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@fluster.io/dev";
import {
  AiLoadingState,
  useAiChatContext,
  useAiChatDispatch,
} from "#/ai/state/chat/chat_context";
import { useSearchParams } from "react-router";
import { NoChatSelectedPlaceholder } from "./no_chat_selected";
import { commands } from "@/lib/bindings";
import { AiChatLoadingIndicator } from "./ai_chat_loading_indicator";
import { TextInputType } from "#/ai/state/ai_state";
import { useDispatch } from "react-redux";
import { setChatInputType } from "#/ai/state/slice";

export const AiChatContainer = (): ReactNode => {
  const context = useAiChatContext();
  const inputValue = useRef("");
  const dispatch = useAiChatDispatch();
  const globalDispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    inputValue.current = context.inputValue;
  }, [context.inputValue]);

  const handleSubmitMessageRequest = async (val: string): Promise<void> => {
    const chatId = searchParams.get("chat_id");
    if (chatId) {
      dispatch({
        type: "setLoadingState",
        payload: AiLoadingState.pending,
      });
      const res = await commands.addAiChatRequest(chatId, val);
      if (res.status === "ok") {
        dispatch({
          type: "chatRequestSuccess",
          payload: null,
        });
        window.dispatchEvent(
          new CustomEvent("request-chat-update", {
            detail: {
              chatId,
            },
          })
        );
        window.dispatchEvent(new CustomEvent("clear-ai-chat-input", {}));
      } else {
        console.error("An error occurred while generating a response message.");
      }
    } else {
      console.log(`No chatId found`);
    }
  };

  const hasChatId = useMemo(() => {
    return searchParams.has("chat_id");
  }, [searchParams]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      {hasChatId ? (
        <div className="@container/ai_chat_container w-full h-full max-h-full pt-8 gap-6 flex flex-col justify-center items-center">
          <AiChatMessageList />
          <div className="w-full px-4 py-3 flex flex-col justify-center items-center h-fit bg-card border-t">
            <AiChatLoadingIndicator />
            <AiChatInput handleSubmit={handleSubmitMessageRequest} />
            <div className="w-full flex flex-row justify-between items-center mt-4">
              <Select
                onValueChange={(val) =>
                  globalDispatch(setChatInputType(val as TextInputType))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Inputs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Inputs</SelectLabel>
                    <SelectItem
                      className="text-foreground"
                      value={TextInputType.singleLine}
                    >
                      Single Line
                    </SelectItem>
                    <SelectItem
                      className="text-foreground"
                      value={TextInputType.multiline}
                    >
                      Multi Line
                    </SelectItem>
                    <SelectItem
                      className="text-foreground"
                      value={TextInputType.editor}
                    >
                      Code Editor
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button onClick={() => handleSubmitMessageRequest()}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <NoChatSelectedPlaceholder />
      )}
    </div>
  );
};

AiChatContainer.displayName = "AiChatContainer";
