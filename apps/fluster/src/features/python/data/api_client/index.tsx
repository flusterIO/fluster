import axios from "axios";
import { SidecarMessage } from "../types";
import { commands } from "@/lib/bindings";

export const SIDECAR_PORT = 8082

export const getSidecarBaseRoute = async (): Promise<string> => {
    const envVar = await commands.getEnvVar("FLUSTER_API_PORT");
    console.log("envVar: ", envVar)
    return `http://localhost:${envVar ?? SIDECAR_PORT}`
}

export const pythonSidecarHelloWorld = async (): Promise<SidecarMessage> => {
    const res = await axios.post(`${await getSidecarBaseRoute()}/ai/chat/note`)
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
    const res = await axios.post(`${await getSidecarBaseRoute()}/ai/chat/note`, {
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


