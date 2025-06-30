import { type ReactNode } from "react";
/* import { Jupyter } from "@datalayer/jupyter-react"; */
/* import { connect } from "react-redux"; */
/* import { AppState } from "@/state/initial_state"; */
import { JupyterConfigState } from "#/editor/state/code_state";
/* import { LoadingComponent } from "@/components/loading_screen"; */
/* import { NoJupyterTokenBanner } from "../presentation/no_token"; */
/* import { commands } from "@/lib/bindings"; */
/* import { useDarkMode } from "@/hooks/use_dark_mode"; */

/* const connector = connect((state: AppState) => ({ */
/*   state: state.code.jupyter, */
/* })); */

interface JupyterProviderProps {
    state: JupyterConfigState;
    children: ReactNode;
}

export const JupyterProvider = (props: JupyterProviderProps) => {
    console.log("props: ", props);
    return null;
};

/* export const JupyterProvider = connector( */
/*   ({ state, children }: JupyterProviderProps): ReactNode => { */
/*     const [token, setToken] = useState<string | null>(null); */
/*     const darkMode = useDarkMode(); */
/*     const getToken = async (val: string = ""): Promise<void> => { */
/*       const res = await commands.getEnvironmentVariable(val); */
/*       if (res.status === "ok") { */
/*         setToken(res.data); */
/*       } else { */
/*         setToken(val); */
/*       } */
/*     }; */

/*     useEffect(() => { */
/*       getToken(state.token); */
/*     }, [state.token]); */
/*     if (token === null) { */
/*       return ( */
/*         <div className="w-full h-full flex flex-col justify-center items-center"> */
/*           <LoadingComponent /> */
/*         </div> */
/*       ); */
/*     } */

/*     if (token === null) { */
/*       return <NoJupyterTokenBanner />; */
/*     } */
/*     return ( */
/*       <Jupyter */
/*         skeleton={<LoadingComponent />} */
/*         defaultKernelName={state.defaultKernelName} */
/*         jupyterServerToken={token} */
/*         jupyterServerUrl={`http://127.0.0.1:${state.port}`} */
/*         colormode={darkMode ? "dark" : "light"} */
/*       > */
/*         {children} */
/*       </Jupyter> */
/*     ); */
/*   } */
/* ); */

/* JupyterProvider.displayName = "JupyterProvider"; */
