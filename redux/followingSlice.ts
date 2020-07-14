import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import firebase from "../firebase";

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
>("following/get", async (credential, thunkApi) => {
  try {
    const response = await firebase
      .firestore()
      .collection("following")
      .doc(credential.uid)
      .get();
    const followingIds: string[] = response.data()?.follow;
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

/* export const logUserOut = createAsyncThunk("auth/logout", async () => {
  const response = await firebase.auth().signOut();
  return response;
}); */

interface followingData {
  firstName: string;
  lastName: string;
  fields?: string[];
  creatorId: string;
  profilePic?: string;
}

interface initialFollowingState {
  following: followingData[] | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export const followingSlice = createSlice({
  name: "following",
  initialState: {
    following: null,
    isLoading: false,
    errorMessage: null,
  } as initialFollowingState,
  reducers: {},
  extraReducers: {
    [getFollowingData.fulfilled.type]: (state, { payload }) => {
      (state.isLoading = false), (state.following = payload);
    },
    [getFollowingData.rejected.type]: (state, { payload }) => {
      (state.isLoading = false), (state.errorMessage = payload.payload);
    },
    [getFollowingData.pending.type]: (state) => {
      state.isLoading = true;
    },
  },
});

//selectors
export const selectFollowing = (state: RootState) => state.following.following;
export const selectErrorMessage = (state: RootState) =>
  state.following.errorMessage;
export const selectIsLoading = (state: RootState) => state.following.isLoading;
