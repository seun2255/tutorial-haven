import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import modalsReducer from "./modals";
import videosReducer from "./videos";

export const store = configureStore({
  reducer: {
    user: userReducer,
    modals: modalsReducer,
    videos: videosReducer,
  },
});
