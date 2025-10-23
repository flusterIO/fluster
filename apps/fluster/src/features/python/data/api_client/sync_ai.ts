import axios from "axios"
import { getSidecarBaseRoute } from "."
import { getSyncAiArgs } from "#/python/methods/get_sync_ai_args";
import { copyStringToClipboard } from "@fluster.io/dev";
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { commands } from "@/lib/bindings";

export const syncAi = async () => {
    const opts = await getSyncAiArgs();
    console.log("JSON.stringify(opts): ", opts);
    await commands.writeFile("/Users/bigsexy/Desktop/notes/content/tech/fluster/syncAiArgs.json", JSON.stringify(opts))
    // const res = await axios.post(`${await getSidecarBaseRoute()}/ai/sync`, opts, {
    //     headers: {
    //         "Content-Type": "application/json",
    //     }
    // });
    // console.log("res.data: ", res.data)
    // 
    // return res.status === 200
    return true
}
