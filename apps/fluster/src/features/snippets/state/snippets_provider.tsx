"use client"
import { ReactNode, createContext, useReducer, useContext } from "react";

export interface SnippetState {
    
}

const defaultInitialValues: SnippetState = {
    
}

export const SnippetContext = createContext<SnippetState>(defaultInitialValues);

type SnippetContextActions = {type: "toggleSidebar", payload?: undefined | null}

export const SnippetDispatchContext = createContext<React.Dispatch<SnippetContextActions>>(null!);


export const useSnippetContext = () => useContext(SnippetContext)
export const useSnippetDispatch = () => useContext(SnippetDispatchContext)


export const SnippetContextReducer = (state: SnippetState, action: SnippetContextActions): SnippetState => {
    switch (action.type) {
        /* case 'xxx': { */
        /*     return { */
        /*         ...state, */
        /*         someProperty: true, */
        /*     } */
        /* } */
        default: {
            return state
        }
    }
}

SnippetContextReducer.displayName = "SnippetContextReducer"

interface SnippetProviderProps {
   children: ReactNode
   initialValues?: Partial<SnippetState>
}

export const SnippetProvider = ({children, initialValues}: SnippetProviderProps) => {
    const [state, dispatch] = useReducer(
        SnippetContextReducer,
        initialValues
            ? { ...initialValues, ...defaultInitialValues }
            : defaultInitialValues,
    );
     
    return (
    <SnippetContext.Provider value={state} >
        <SnippetDispatchContext.Provider value={dispatch}>
                {children}
        </SnippetDispatchContext.Provider>
    </SnippetContext.Provider>
    )
}

