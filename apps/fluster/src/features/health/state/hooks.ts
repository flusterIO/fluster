import { useContext } from "react";
import { HealthContext } from "./health_context";
import { HealthDispatchContext } from "./health_dispatch_context";

export const useHealthContext = () => useContext(HealthContext);
export const useHealthDispatch = () => useContext(HealthDispatchContext);
