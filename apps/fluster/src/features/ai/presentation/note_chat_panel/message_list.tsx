import { AiChatMessageModel } from '@/lib/bindings'
import dayjs from 'dayjs'
import React, { type ReactNode } from 'react'
import { SidePanelOutgoingMessage } from './outgoing_message'
import { SidePanelIncomingMessage } from './incoming_message'
import { cn } from '@fluster.io/dev'



interface SidePanelMessageListProps {
    messages: AiChatMessageModel[]
    className?: string
}

export const SidePanelMessageList = ({ messages, className }: SidePanelMessageListProps): ReactNode => {
    return (
        <div
            className={cn("overflow-y-auto overflow-x-hidden w-full space-y-3", className)}
        >
            {messages.sort((a, b) => dayjs(a.sent_at, {
                utc: true
            }).valueOf() - dayjs(
                b.sent_at,
                {
                    utc: true
                }
            ).valueOf()).map((message) => {
                return message.role === "User" ? <SidePanelOutgoingMessage key={message.id} msg={message} /> : <SidePanelIncomingMessage key={message.id} msg={message} />
            })
            }</div>
    )
}


SidePanelMessageList.displayName = "SidePanelMessageList"
