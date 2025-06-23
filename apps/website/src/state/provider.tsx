"use client";
import React, { ReactNode } from "react";
import store from "./store";
import { Provider } from "react-redux";

interface InternalReduxProviderProps {
  children: ReactNode;
}

const InternalReduxProvider = ({ children }: InternalReduxProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

InternalReduxProvider.displayName = "InternalReduxProvider";

export default InternalReduxProvider;
