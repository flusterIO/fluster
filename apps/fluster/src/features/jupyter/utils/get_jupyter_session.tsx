import axios from "axios";
import { getJupyterUrl } from "./get_jupyter_url";

// BETA: This is completely unused. Going back to jupyter-react for now.
export const getJupyterSession = async (jupyterPort: number) => {
    const session = await axios.get(getJupyterUrl(jupyterPort), {});
};
