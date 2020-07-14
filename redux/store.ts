import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { followingSlice } from "./followingSlice";
import { exploreSlice } from "./exploreSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    following: followingSlice.reducer,
    explore: exploreSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
