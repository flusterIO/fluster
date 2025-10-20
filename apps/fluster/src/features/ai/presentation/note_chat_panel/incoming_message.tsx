import { InlineMdxContent } from '#/mdx/presentation/inline_mdx_content'
import { AiChatMessageModel } from '@/lib/bindings'
import React, { type ReactNode } from 'react'



interface SidePanelIncomingMessageProps {
    msg: AiChatMessageModel
}

export const SidePanelIncomingMessage = ({ msg }: SidePanelIncomingMessageProps): ReactNode => {
    return (
        <div className="bg-secondary p-3 rounded-md rounded-br-none w-full">
            <InlineMdxContent abortIfNoMath mdx={msg.body} />
        </div>
    )
}


SidePanelIncomingMessage.displayName = "SidePanelIncomingMessage"
