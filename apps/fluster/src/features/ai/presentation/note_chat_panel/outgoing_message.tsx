import { InlineMdxContent } from '#/mdx/presentation/inline_mdx_content'
import { AiChatMessageModel } from '@/lib/bindings'
import React, { type ReactNode } from 'react'



interface SidePanelOutgoingMessageProps {
    msg: AiChatMessageModel
}

export const SidePanelOutgoingMessage = ({ msg }: SidePanelOutgoingMessageProps): ReactNode => {
    return (
        <div className="bg-primary text-primary-foreground p-3 rounded-md w-full">
            <InlineMdxContent abortIfNoMath mdx={msg.body} />
        </div>
    )
}


SidePanelOutgoingMessage.displayName = "SidePanelOutgoingMessage"
