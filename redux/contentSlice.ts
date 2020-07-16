import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import firebase from "../firebase";

//thunks

interface ErrorMessage {
  errorMessage: string;
}
interface Parameters {
  cid: string | undefined;
}

export const getCreatorContent = createAsyncThunk<
  any,
  Parameters,
  {
    rejectValue: ErrorMessage;
  }
>("content/getCreatorContent", async ({ cid }, thunkApi) => {
  try {
    const dataSnap = await firebase
      .firestore()
      .collection("content")
      .where("creatorId", "==", cid)
      .orderBy("createdAt", "desc")
      .limit(3)
      .get();

    const res = dataSnap.docs.map((doc) => {
      return {
        ...doc.data(),
        createdAt: JSON.stringify(doc.data().createdAt),
        contentId: doc.id,
      };
    });
    return res;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

//TODO: think about the data duplication here --
// info present also in explore or profile in linked from there
export const getCreatorInfo = createAsyncThunk<
  any,
  Parameters,
  {
    rejectValue: ErrorMessage;
  }
>("content/getCreatorInfo", async ({ cid }, thunkApi) => {
  try {
    const creatorSnap = await firebase
      .firestore()
      .collection("creators")
      .doc(cid)
      .get();
    return { ...creatorSnap.data(), creatorId: creatorSnap.id };
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export interface creatorInfoType {
  firstName: string;
  lastName: string;
  fields?: string[];
  creatorId: string;
  profilePic?: string;
}
export interface creatorContentType {
  content: any;
  coverUrl: string;
  createdAt: string; // JSON.stringify
  creatorId: string;
  creatorName: string;
  creatorPicUrl: string;
  contentId: string;
  title: string;
  type: number;
}

interface initialContentState {
  creator: {
    info: creatorInfoType | null;
    content: creatorContentType[] | null;
  };
  isLoading: boolean;
  errorMessage: string | null;
}

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    creator: {
      info: null,
      content: null,
    },
    isLoading: false,
    errorMessage: null,
  } as initialContentState,
  reducers: {},
  extraReducers: {
    [getCreatorInfo.fulfilled.type]: (state, { payload }) => {
      (state.isLoading = false), (state.creator.info = payload);
    },
    [getCreatorInfo.rejected.type]: (state, { payload }) => {
      (state.isLoading = false), (state.errorMessage = payload.payload);
    },
    [getCreatorInfo.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getCreatorContent.fulfilled.type]: (
      state,
      { payload }: { payload: creatorContentType[] }
    ) => {
      (state.isLoading = false), (state.creator.content = payload);
    },
    [getCreatorContent.rejected.type]: (state, { payload }) => {
      (state.isLoading = false), (state.errorMessage = payload.payload);
    },
    [getCreatorContent.pending.type]: (state) => {
      state.isLoading = true;
    },
  },
});

//selectors
export const selectCreator = (state: RootState) => state.content.creator;
export const selectErrorMessage = (state: RootState) =>
  state.content.errorMessage;
export const selectIsLoading = (state: RootState) => state.content.isLoading;
