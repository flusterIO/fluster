import React, { ReactNode, useMemo } from "react";
import store from "./store";
import { Provider } from "react-redux";

interface Props {
  children: ReactNode;
}

const ReduxProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

ReduxProvider.displayName = "ReduxProvider";

export default ReduxProvider;
