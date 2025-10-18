import axios from "axios";
import { SidecarMessage } from "../types";

export const SIDECAR_PORT = 8082

export const pythonSidecarHelloWorld = async (): Promise<SidecarMessage> => {
    const res = await axios.get(`http://localhost:${SIDECAR_PORT}/ai`)
    console.log("res: ", res)
    return res.data as SidecarMessage
}
