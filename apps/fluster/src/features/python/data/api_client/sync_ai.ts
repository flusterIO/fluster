import { getSyncAiArgs } from "#/python/methods/get_sync_ai_args";
import { commands } from "@/lib/bindings";

// TODO: Remove all references to this.
export const syncAi = async () => {
    const opts = await getSyncAiArgs();
    console.log("JSON.stringify(opts): ", opts);
    await commands.writeFile(
        "/Users/bigsexy/Desktop/notes/content/tech/fluster/syncAiArgs.json",
        JSON.stringify(opts)
    );
    // const res = await axios.post(`${await getSidecarBaseRoute()}/ai/sync`, opts, {
    //     headers: {
    //         "Content-Type": "application/json",
    //     }
    // });
    // console.log("res.data: ", res.data)
    //
    // return res.status === 200
    return true;
};
