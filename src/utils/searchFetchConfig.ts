import { AxiosRequestConfig } from "axios";

interface SearchResponseQuerySearch {
  page: number;
  query: string;
}

interface RequestConfigMoviesSearchParams extends AxiosRequestConfig {
  params: SearchResponseQuerySearch;
}

export const searchFetchConfig = (
  page: number | null,
  query: string | null,
): RequestConfigMoviesSearchParams => ({
  params: {
    page: page || 1,
    query: query || "",
  },
});
