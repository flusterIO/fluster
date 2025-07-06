"use client";
import { createContext, useContext } from "react";

export interface PlotsState {
    plotIds: string[];
    haveLoadedPlots: boolean;
}

export const initialPlotsState: PlotsState = {
    plotIds: [],
    haveLoadedPlots: false,
};

export const PlotsContext = createContext<PlotsState>(initialPlotsState);

type PlotsContextActions =
    | {
        type: "appendPlotId";
        payload: {
            plotId: string;
        };
    }
    | {
        type: "setHaveLoadedPlots";
        payload: null;
    };

export const PlotsDispatchContext = createContext<
    React.Dispatch<PlotsContextActions>
>(null!);

export const usePlotsContext = () => useContext(PlotsContext);
export const usePlotsDispatch = () => useContext(PlotsDispatchContext);

export const PlotsContextReducer = (
    state: PlotsState,
    action: PlotsContextActions
): PlotsState => {
    switch (action.type) {
        case "setHaveLoadedPlots": {
            return {
                ...state,
                haveLoadedPlots: true,
            };
        }
        case "appendPlotId": {
            return {
                ...state,
                plotIds: state.plotIds.some((x) => x === action.payload.plotId)
                    ? state.plotIds
                    : [...state.plotIds, action.payload.plotId],
            };
        }
        default: {
            return state;
        }
    }
};

PlotsContextReducer.displayName = "PlotsContextReducer";
