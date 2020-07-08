import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import firebase from "../firebase";

//thunks

/* 
  Log in/out thunks don't directly changes the authenticated value 
  of the auth slice because it's handled by useFirebaseAuth hooks 
  */
export const logUserIn = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; psw: string }) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.psw);

    return response.user?.email;
  }
);

export const logUserOut = createAsyncThunk("auth/logout", async () => {
  const response = await firebase.auth().signOut();
  return response;
});

export type initialAuthState = {
  authenticated: Boolean;
  isLoading: Boolean;
  errorMessage: null | string;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    isLoading: false,
    errorMessage: null,
  } as initialAuthState,
  reducers: {
    logIn: (state) => {
      state.authenticated = true;
    },
    logOut: (state) => {
      state.authenticated = false;
    },
  },
  extraReducers: {
    [logUserIn.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [logUserIn.rejected.type]: (state) => {
      (state.isLoading = false), (state.errorMessage = "Errore");
    },
    [logUserIn.pending.type]: (state) => {
      state.isLoading = true;
    },
  },
});

//reducers
export const { logIn, logOut } = authSlice.actions;

//selectors
export const selectAuthenticated = (state: RootState) =>
  state.auth.authenticated;
export const selectErrorMessage = (state: RootState) => state.auth.errorMessage;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
