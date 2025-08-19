import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { AiChatModel, commands } from "@/lib/bindings";
import { AiSettingsPanelRightForm } from "./ai_settings_panel_right_form";

export const AiChatSettingsPanelRight = () => {
    const [sp] = useSearchParams();
    const chatId = sp.get("chat_id");
    const [chat, setChat] = useState<null | AiChatModel>(null);
    const getData = async (): Promise<void> => {
        if (!chatId) {
            return;
        }
        const res = await commands.getAiChatById(chatId);
        if (res.status === "ok") {
            setChat(res.data.chat);
        } else {
            console.error(
                "An error occurred while attempting to load this AI chat's data."
            );
        }
    };
    useEffect(() => {
        getData();
        /* eslint-disable-next-line  --  */
    }, [chatId]);

    if (!chat) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="text-xl font-semibold">No model selected.</div>
                <div className="text-sm">Select a model to continue</div>
            </div>
        );
    }
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <AiSettingsPanelRightForm model={chat} />
        </div>
    );
};
