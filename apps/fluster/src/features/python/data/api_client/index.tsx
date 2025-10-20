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



/**
 * Returns a string representing the response from the user's selected AI chat bot that is aware of the user's note.
 * @param absoluteFilePath - The absolute file path to the focused note.
 * @param userMessage - The user message to the chat bot.
 */
export const getNoteChatResponse = async (
    absoluteFilePath: string,
    userMessage: string
): Promise<SidecarMessage> => {
    /* const res = await axios.get(`${baseRoute()}/ai/chat/note`, { */
    /*     headers: { */
    /*         "Content-Type": "application/json" */
    /*     } */
    /* }) */
    const res = await axios.post(`${baseRoute()}/ai/chat/note`, {
        file: absoluteFilePath,
        msg: userMessage
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    console.log("res.data: ", res.data)
    return res.data as SidecarMessage
}
