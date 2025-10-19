import React, { useEffect, useRef, useState, type ReactNode } from 'react'
import { AppState } from "@/state/initial_state";
import { connect } from 'react-redux';
import { SidePanelMessageList } from './message_list';
import { Textarea } from '@fluster.io/dev';
import { AiChatMessageModel, commands } from '@/lib/bindings';

const connector = connect((state: AppState) => ({
    notesDirectory: state.core.notesDirectory,
    // FIXME: Change this to panel left once it's in place.
    open: state.panelRight.open
}))

interface Props {
    notesDirectory: AppState["core"]["notesDirectory"]
    open: boolean
}

export const NoteChatSidePanel = connector((props: Props): ReactNode => {
    const [messages, setMessages] = useState<AiChatMessageModel[]>([]);
    const input = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (): Promise<void> => {
        const now = new Date().toString();
        const outgoingId = await commands.getUniqueId();
        messages.push({
            id: outgoingId,
            body: inputValue,
            role: "User",
            sent_at: now,
            chat_id: "--"
        })
        setInputValue("")
    }

    useEffect(() => {
        if (props.open) {
            input.current?.focus()
        }
    }, [props.open])

    return (
        <div className="w-full h-full max-h-full flex flex-col justify-center items-center gap-4">
            <SidePanelMessageList
                messages={messages}
                className="flex-grow overflow-y-auto px-4"
            />
            <div className="w-full px-3 pt-3 bg-secondary">
                <Textarea
                    value={inputValue}
                    ref={input}
                    className="!bg-background !text-foreground"
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={5}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && e.metaKey) {
                            e.stopPropagation()
                            e.preventDefault()
                            handleSubmit()
                        }
                    }}
                />
                <div className="text-[12px] text-muted-foreground">cmd+Enter to submit</div>
            </div>
        </div>
    )
})


NoteChatSidePanel.displayName = "NoteChatSidePanel"
