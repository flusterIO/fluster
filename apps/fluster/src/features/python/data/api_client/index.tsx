import axios from "axios";
import { SidecarMessage } from "../types";

export const SIDECAR_PORT = 8082

const baseRoute = (): string => {
    return `http://localhost:${SIDECAR_PORT}`
}

export const pythonSidecarHelloWorld = async (): Promise<SidecarMessage> => {
    const res = await axios.post(`${baseRoute()}/ai/chat/note`)
    return res.data as SidecarMessage
}



export const getNoteChatResponse = async (absoluteFilePath: string): Promise<SidecarMessage> => {
    const res = await axios.post(`${baseRoute()}/ai/chat/note`, {
        file: absoluteFilePath
    })
    return res.data as SidecarMessage
}
