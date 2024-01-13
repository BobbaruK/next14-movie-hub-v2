"use client";

import MovieGrid from "@/components/MovieGrid";
import MoviePagination from "@/components/MoviePagination";
import { RQ_POPULAR_TVSHOWS_ENDPOINT } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { TVShowsResponse } from "@/types/movies/tv/TVShowsResponse";
import moviesFetchConfig from "@/utils/moviesFetchConfig";
import { useQuery } from "@tanstack/react-query";

interface Props {
  page: number;
  with_genres: string;
  sort_by: string;
  with_original_language: string;
  queryKey: string;
}

const TVShowsGridSection = ({
  page,
  with_genres,
  sort_by,
  with_original_language,
  queryKey,
}: Props) => {
  const moviesConfig = moviesFetchConfig(
    page,
    with_genres,
    with_original_language,
    sort_by,
  );

  const apiClient = new MyAPIClient<TVShowsResponse>(
    RQ_POPULAR_TVSHOWS_ENDPOINT,
  );

  const { data, error, isLoading } = useQuery<TVShowsResponse>({
    queryKey: [queryKey, moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading TV Shows...</div>;

  if (data?.results.length === 0)
    return <div className="alert alert-warning">No results</div>;

  return (
    <>
      <div className="mb-4">
        <MoviePagination
          movie={data}
          page={page}
          with_genres={with_genres}
          sort_by={sort_by}
          with_original_language={with_original_language}
        />
      </div>
      <MovieGrid movies={data} />
      <div className="mt-4">
        <MoviePagination
          movie={data}
          page={page}
          with_genres={with_genres}
          sort_by={sort_by}
          with_original_language={with_original_language}
        />
      </div>
    </>
  );
};

export default TVShowsGridSection;
