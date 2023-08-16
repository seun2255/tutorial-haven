import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
};

export const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    updateVideos: (state, action) => {
      state.videos = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateVideos } = videosSlice.actions;

export default videosSlice.reducer;
