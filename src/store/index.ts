import {
  configureStore,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { linksAppApi } from "./services/links.api";
import { clearUser } from "./slices/authSlice";
import authReducer from "./slices/authSlice";

export const authErrorHander: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      api.dispatch(clearUser());
    }

    return next(action);
  };

const store = configureStore({
  reducer: {
    authReducer,
    [linksAppApi.reducerPath]: linksAppApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(linksAppApi.middleware, authErrorHander),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
