import { AxiosRequestConfig } from "axios";

interface MovieResponseQuerySearch {
  page: number;
  with_original_language: string;
  with_genres: string;
  sort_by: string;
}

interface RequestConfigMoviesSearchParams extends AxiosRequestConfig {
  params: MovieResponseQuerySearch;
}

const moviesFetchConfig = (
  page: number,
  language: string,
  sort: string
): RequestConfigMoviesSearchParams => ({
  params: {
    page: page || 1,
    with_original_language: language || "",
    with_genres: [].join(","),
    sort_by: sort || "popularity.desc",
  },
});

export default moviesFetchConfig;
