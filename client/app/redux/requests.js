import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
};

export const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    updateRequests: (state, action) => {
      state.requests = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateRequests } = requestsSlice.actions;

export default requestsSlice.reducer;
