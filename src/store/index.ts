import { configureStore } from "@reduxjs/toolkit";
import { linksAppApi } from "./services/links.api";
import { authErrorHander } from "./middlewares";
import linkReducer from "./slices/linksSlice";
import authReducer from "./slices/authSlice";
import modalReducer from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    [linksAppApi.reducerPath]: linksAppApi.reducer,
    linkReducer,
    authReducer,
    modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(linksAppApi.middleware, authErrorHander),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
