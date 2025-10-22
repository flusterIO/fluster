import axios from "axios"
import { getSidecarBaseRoute } from "."
import { getSyncAiArgs } from "#/python/methods/get_sync_ai_args";

export const syncAi = async () => {
    const opts = await getSyncAiArgs();
    const res = await axios.post(`${await getSidecarBaseRoute()}/ai/sync`, opts, {
        headers: {
            "Content-Type": "application/json",
            // "Origin": "http://localhost:1420"
        }
    });
    console.log("res.data: ", res.data)
    return res.status === 200
}
