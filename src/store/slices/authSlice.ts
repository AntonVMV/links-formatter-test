import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IForm, ILoginResponse } from "../../types";

export interface UserState {
  logged: boolean;
  loading: boolean;
  error: null | string;
}

export const loginUser = createAsyncThunk<
  ILoginResponse,
  IForm,
  { rejectValue: string }
>("user/loginUser", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<ILoginResponse>(
      "http://79.143.31.216/login",
      new URLSearchParams({ ...formData })
    );

    if (data.access_token) {
      localStorage.setItem("links_app_token", data.access_token);
    }

    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return rejectWithValue(e.response?.data.detail);
    } else {
      return rejectWithValue("Unknown error");
    }
  }
});

const initialState: UserState = {
  logged: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(loginUser.pending, (store) => {
        store.loading = true;
        store.error = null;
      })
      .addCase(loginUser.fulfilled, (store) => {
        store.logged = true;
        store.loading = false;
      })
      .addCase(loginUser.rejected, (store, action) => {
        store.logged = false;
        store.loading = false;
        if (action.payload) {
          store.error = action.payload;
        } else {
          store.error = "Unknown error";
        }
      });
  },
});

export default authSlice.reducer;
