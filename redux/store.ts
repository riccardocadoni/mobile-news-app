import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { profileSlice } from "./profileSlice";
import { exploreSlice } from "./exploreSlice";
import { contentSlice } from "./contentSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    explore: exploreSlice.reducer,
    content: contentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
