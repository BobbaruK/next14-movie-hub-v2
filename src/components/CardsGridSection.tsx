"use client";

import MyAPIClient from "@/services/myApiClient";
import { MoviesResponse } from "@/types/movies/movie/MoviesResponse";
import { TVShowsResponse } from "@/types/movies/tv/TVShowsResponse";
import { PeoplesResponse } from "@/types/people/PeoplesResponse";
import moviesFetchConfig from "@/utils/moviesFetchConfig";
import { useQuery } from "@tanstack/react-query";
import MovieGrid from "./MovieGrid";
import MoviePagination from "./MoviePagination";

interface Props {
  page: number;
  with_genres: string;
  sort_by: string;
  with_original_language: string;
  queryKey: string;
  endpoint: string;
}

const CardsGridSection = ({
  page,
  with_genres,
  sort_by,
  with_original_language,
  queryKey,
  endpoint,
}: Props) => {
  const moviesConfig = moviesFetchConfig(
    page,
    with_genres,
    with_original_language,
    sort_by,
  );

  const apiClient = new MyAPIClient<
    MoviesResponse | TVShowsResponse | PeoplesResponse
  >(endpoint);

  const { data, error, isLoading } = useQuery<
    MoviesResponse | TVShowsResponse | PeoplesResponse
  >({
    queryKey: [queryKey, moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading) return <div className="alert alert-info">Loading shit...</div>;

  if (data?.results.length === 0)
    return <div className="alert alert-warning">No results</div>;

  return (
    <>
      <div className="mb-4">
        <MoviePagination
          movie={data!}
          page={page}
          with_genres={with_genres}
          sort_by={sort_by}
          with_original_language={with_original_language}
        />
      </div>
      <MovieGrid movies={data!} />
      <div className="mt-4">
        <MoviePagination
          movie={data!}
          page={page}
          with_genres={with_genres}
          sort_by={sort_by}
          with_original_language={with_original_language}
        />
      </div>
    </>
  );
};

export default CardsGridSection;
