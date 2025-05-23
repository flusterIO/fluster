"use client";
import { ReactNode, createContext, useReducer, useContext } from "react";

export interface SnippetState {
  languageFilter: Record<string, boolean>;
}

export enum SnippetActions {
  setLanguageFilters,
}

const defaultInitialValues: SnippetState = {
  languageFilter: {},
};

export const SnippetContext = createContext<SnippetState>(defaultInitialValues);

type SnippetContextActions = {
  type: SnippetActions.setLanguageFilters;
  payload: SnippetState["languageFilter"];
};

export const SnippetDispatchContext = createContext<
  React.Dispatch<SnippetContextActions>
>(null!);

export const useSnippetContext = () => useContext(SnippetContext);
export const useSnippetDispatch = () => useContext(SnippetDispatchContext);

export const SnippetContextReducer = (
  state: SnippetState,
  action: SnippetContextActions,
): SnippetState => {
  switch (action.type) {
    case SnippetActions.setLanguageFilters: {
      return {
        ...state,
        languageFilter: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

SnippetContextReducer.displayName = "SnippetContextReducer";

interface SnippetProviderProps {
  children: ReactNode;
  initialValues?: Partial<SnippetState>;
}

export const SnippetProvider = ({
  children,
  initialValues,
}: SnippetProviderProps) => {
  const [state, dispatch] = useReducer(
    SnippetContextReducer,
    initialValues
      ? { ...initialValues, ...defaultInitialValues }
      : defaultInitialValues,
  );

  return (
    <SnippetContext.Provider value={state}>
      <SnippetDispatchContext.Provider value={dispatch}>
        {children}
      </SnippetDispatchContext.Provider>
    </SnippetContext.Provider>
  );
};
