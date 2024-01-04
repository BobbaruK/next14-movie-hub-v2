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
  genres: string,
  language: string,
  sort: string,
): RequestConfigMoviesSearchParams => ({
  params: {
    page: page || 1,
    with_genres: genres || "",
    with_original_language: language || "",
    sort_by: sort || "popularity.desc",
  },
});

export default moviesFetchConfig;
