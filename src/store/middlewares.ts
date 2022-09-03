import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { clearUser } from "./slices/authSlice";

export const authErrorHander: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      api.dispatch(clearUser());
    }

    return next(action);
  };
