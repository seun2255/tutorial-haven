import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import modalsReducer from "./modals";
import videosReducer from "./videos";
import tabReducer from "./tab";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["user", "videos"],
// };

export const store = configureStore({
  reducer: {
    user: userReducer,
    modals: modalsReducer,
    videos: videosReducer,
  },
});

// const rootReducer = combineReducers({
//   user: userReducer,
//   modals: modalsReducer,
//   videos: videosReducer,
//   tab: tabReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [thunk],
// });

// export const persistor = persistStore(store);
