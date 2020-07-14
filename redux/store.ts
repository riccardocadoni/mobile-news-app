import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { followingSlice } from "./followingSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    following: followingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
