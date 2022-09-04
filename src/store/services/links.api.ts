import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IForm, ILinkData } from "../../types";

export const linksAppApi = createApi({
  reducerPath: "linksAppApi",
  tagTypes: ["links"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://79.143.31.216",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("links_app_token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (build) => ({
    createLink: build.mutation<ILinkData, string>({
      query: (data) => ({
        method: "POST",
        url: "/squeeze",
        params: {
          link: data,
        },
      }),
      invalidatesTags: ["links"],
    }),

    createUser: build.mutation<{ username: string }, IForm>({
      query: (formData) => ({
        method: "POST",
        url: "/register",
        params: formData,
      }),
    }),
  }),
});

export const resetApi = () => linksAppApi.util.resetApiState();

export const { useCreateLinkMutation, useCreateUserMutation } = linksAppApi;
