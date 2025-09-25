import { getJupyterUrl } from "#/jupyter/utils/get_jupyter_url";
import { AppState } from "@/state/initial_state";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// BETA: Unused
export const useCreateJupyterSession = () => {
    const jupyterState = useSelector((state: AppState) => state.code.jupyter);
    const createFlusterJupyterSession = async (): Promise<void> => {
        const res = await axios.get(getJupyterUrl(jupyterState.port), {});
        console.log("res: ", res);
    };
    useEffect(() => {
        createFlusterJupyterSession();
    }, []);
};
