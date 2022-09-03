import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ILinkData, ILinksOptions } from "../../types";
import { axiosInstance } from "../../utils/axios";

interface IState {
  data: ILinkData[];
  isMoreData: boolean;
  loading: boolean;
  error: null | string;
}

const initialState: IState = {
  data: [],
  isMoreData: false,
  loading: false,
  error: null,
};

export const getLinks = createAsyncThunk<
  ILinkData[],
  ILinksOptions,
  { rejectValue: string }
>("links/getLinks", async (options, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<ILinkData[]>("/statistics", {
      params: options,
    });

    return data;
  } catch (e) {
    return rejectWithValue("S");
  }
});

const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    addNewLink: (state, action: PayloadAction<ILinkData>) => {
      state.data.push(action.payload);
    },
    clearLinks: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data.push(...action.payload);
        if (action.payload.length < 10) {
          state.isMoreData = false;
        } else {
          state.isMoreData = true;
        }
      });
  },
});

export const { addNewLink, clearLinks } = linksSlice.actions;

export default linksSlice.reducer;
