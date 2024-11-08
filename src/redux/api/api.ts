import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.PROD ? "/api" : `http://localhost:3001`,
  }),
  tagTypes: ["Tasks"],
  endpoints: () => ({}),
});

export default api;
