import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { isAuthError } from "../../helpers/helpers";
import { IForm, ILoginResponse } from "../../types";
import { setModal } from "./modalSlice";

export interface UserState {
  logged: boolean;
  loading: boolean;
  error: null | string;
}

export const loginUser = createAsyncThunk<
  ILoginResponse,
  IForm,
  { rejectValue: string }
>("user/loginUser", async (formData, { rejectWithValue, dispatch }) => {
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
    if (e instanceof AxiosError && e.response) {
      if (isAuthError(e.response.data)) {
        const { detail } = e.response.data;
        dispatch(
          setModal(typeof detail === "string" ? detail : "Unknown Error")
        );
      }
      return rejectWithValue(e.response.data.detail);
    } else {
      dispatch(setModal("Unknown error"));
      return rejectWithValue("Unknown error");
    }
  }
});

const initialState: UserState = {
  logged: false,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (store) => {
      store.logged = true;
      store.loading = false;
    },
    clearUser: (store) => {
      store.logged = false;
      store.loading = false;
      store.error = null;
    },
  },
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

export const { clearUser, setUser } = authSlice.actions;

export default authSlice.reducer;
