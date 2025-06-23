"use client";
import { createContext } from "react";
import { HealthContextActions } from "./types";

export const HealthDispatchContext = createContext<
    React.Dispatch<HealthContextActions>
>(null!);
