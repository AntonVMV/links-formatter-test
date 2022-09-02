import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ILinkData } from "../../types";

export const linksAppApi = createApi({
  reducerPath: "linksAppApi",
  tagTypes: ["links"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://79.143.31.216",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("links_app_token");

      if (token) {
        console.log(token);
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (build) => ({
    getLinksData: build.query<ILinkData[], void>({
      query: () => ({
        method: "GET",
        url: "/statistics",
      }),
      providesTags: ["links"],
    }),
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
  }),
});

export const resetApi = () => linksAppApi.util.resetApiState();

export const { useGetLinksDataQuery, useCreateLinkMutation } = linksAppApi;
