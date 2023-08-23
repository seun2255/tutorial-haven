import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: "Videos",
};

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.selected = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTab } = tabSlice.actions;

export default tabSlice.reducer;
