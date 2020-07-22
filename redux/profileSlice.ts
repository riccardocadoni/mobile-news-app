import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import firebase from "../firebase";
//type
import { CreatorInfoType } from "./contentSlice";

//thunks

interface ErrorMessage {
  errorMessage: string;
}
type LoginReturn = any;
interface Credential {
  uid: string | undefined;
}

export const getFollowingData = createAsyncThunk<
  LoginReturn,
  Credential,
  {
    rejectValue: ErrorMessage;
  }
>("profile/getFollowing", async (credential, thunkApi) => {
  try {
    const response = await firebase
      .firestore()
      .collection("following")
      .doc(credential.uid)
      .get();
    const followingIds: string[] = response.data()?.follow;
    if (!followingIds) return null;
    const creatorsData = Promise.all(
      //for every id returns object with creator data
      followingIds.map(async (id: string) => {
        const creatorSnap = await firebase
          .firestore()
          .collection("creators")
          .doc(id)
          .get();
        const creatorData = creatorSnap.data();
        return { ...creatorData, creatorId: creatorSnap.id };
      })
    );
    return creatorsData;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

interface initialProfileState {
  following: CreatorInfoType[] | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    following: null,
    isLoading: false,
    errorMessage: null,
  } as initialProfileState,
  reducers: {
    reset: (state) => ({
      following: null,
      isLoading: false,
      errorMessage: null,
    }),
  },
  extraReducers: {
    [getFollowingData.fulfilled.type]: (state, { payload }) => {
      (state.isLoading = false), (state.following = payload);
    },
    [getFollowingData.rejected.type]: (state, { payload }) => {
      (state.isLoading = false), (state.errorMessage = payload);
    },
    [getFollowingData.pending.type]: (state) => {
      state.isLoading = true;
    },
  },
});

//reducers
export const { reset } = profileSlice.actions;

//selectors
export const selectFollowing = (state: RootState) => state.profile.following;
export const selectErrorMessage = (state: RootState) =>
  state.profile.errorMessage;
export const selectIsLoading = (state: RootState) => state.profile.isLoading;
