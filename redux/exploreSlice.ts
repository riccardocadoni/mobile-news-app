import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import firebase from "../firebase";
//type
import { creatorDataType } from "./contentSlice";

//thunks

interface ErrorMessage {
  errorMessage: string;
}
interface Credential {
  uid: string | undefined;
}

export const getAllCreators = createAsyncThunk<
  any,
  Credential,
  {
    rejectValue: ErrorMessage;
  }
>("explore/getAllCreators", async (credential, thunkApi) => {
  try {
    const creatorSnap = await firebase.firestore().collection("creators").get();

    const creators: any = [];
    creatorSnap.forEach((snap) => {
      const data = snap.data();
      const obj = { ...data, creatorId: snap.id };
      creators.push(obj);
    });
    return creators;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

interface initialExploreState {
  creators: creatorDataType[] | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export const exploreSlice = createSlice({
  name: "explore",
  initialState: {
    creators: null,
    isLoading: false,
    errorMessage: null,
  } as initialExploreState,
  reducers: {},
  extraReducers: {
    [getAllCreators.fulfilled.type]: (state, { payload }) => {
      (state.isLoading = false), (state.creators = payload);
    },
    [getAllCreators.rejected.type]: (state, { payload }) => {
      (state.isLoading = false), (state.errorMessage = payload.payload);
    },
    [getAllCreators.pending.type]: (state) => {
      state.isLoading = true;
    },
  },
});

//selectors
export const selectExplore = (state: RootState) => state.explore.creators;
export const selectErrorMessage = (state: RootState) =>
  state.explore.errorMessage;
export const selectIsLoading = (state: RootState) => state.explore.isLoading;
