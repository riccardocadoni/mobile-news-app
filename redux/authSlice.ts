import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import firebase from '../firebase';

//thunks

/* 
  Log in/out thunks don't directly changes the authenticated value 
  of the auth slice because it's handled by useFirebaseAuth hooks 
  */

interface ErrorMessage {
  errorMessage: string;
}
type LoginReturn = any;
interface Credential {
  email: string;
  psw: string;
}

export const logUserIn = createAsyncThunk<
  LoginReturn,
  Credential,
  {
    rejectValue: ErrorMessage;
  }
>('auth/login', async (credentials, thunkApi) => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.psw);

    return response.user?.email;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const logUserOut = createAsyncThunk('auth/logout', async () => {
  const response = await firebase.auth().signOut();
  return response;
});

export type initialAuthState = {
  authenticated: Boolean;
  isLoading: Boolean;
  errorMessage: null | string;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
    isLoading: true,
    errorMessage: null,
  } as initialAuthState,
  reducers: {
    logIn: (state) => {
      state.authenticated = true;
      state.isLoading = false;
    },
    logOut: (state) => {
      state.authenticated = false;
      state.isLoading = false;
    },
    deleteErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
  extraReducers: {
    [logUserIn.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [logUserIn.rejected.type]: (state, action) => {
      (state.isLoading = false), (state.errorMessage = action.payload);
    },
    [logUserIn.pending.type]: (state) => {
      state.isLoading = true;
    },
  },
});

//reducers
export const { logIn, logOut, deleteErrorMessage } = authSlice.actions;

//selectors
export const selectAuthenticated = (state: RootState) =>
  state.auth.authenticated;
export const selectErrorMessage = (state: RootState) => state.auth.errorMessage;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
