import axios from "axios";
import { SidecarMessage } from "../types";

export const SIDECAR_PORT = 8082

const baseRoute = (): string => {
    return `http://localhost:${SIDECAR_PORT}`
}

export const pythonSidecarHelloWorld = async (): Promise<SidecarMessage> => {
    const res = await axios.get(`${baseRoute()}/ai/chat/general`)
    return res.data as SidecarMessage
}
