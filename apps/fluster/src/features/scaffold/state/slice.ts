import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialScaffoldState } from "./initial_state";

const scaffoldSlice = createSlice({
    name: "scaffold",
    initialState: initialScaffoldState,
    reducers: {},
});

export default scaffoldSlice.reducer;
