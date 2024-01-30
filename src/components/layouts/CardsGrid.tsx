"use client";

import MyAPIClient from "@/services/myApiClient";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { Movie } from "@/types/movies/movie/MoviesResponse";
import { TVShow } from "@/types/movies/tv/TVShowsResponse";
import { People } from "@/types/people/PeoplesResponse";
import moviesFetchConfig from "@/utils/moviesFetchConfig";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import MovieGrid from "./MovieGrid";
import MoviePagination from "./MoviePagination";
import CustomAlert from "../CustomAlert";
import { ImageDetails } from "@/types/ImageDetails";

interface Props {
  page: number;
  with_genres: string;
  sort_by: string;
  with_original_language: string;
  queryKey: string;
  endpoint: string;
  imageDetails: ImageDetails;
}

const CardsGrid = ({
  page,
  with_genres,
  sort_by,
  with_original_language,
  queryKey,
  endpoint,
  imageDetails,
}: Props) => {
  const moviesConfig = moviesFetchConfig(
    page,
    with_genres,
    with_original_language,
    sort_by,
  );

  const apiClient = new MyAPIClient<
    | MainTitleResponse<Movie>
    | MainTitleResponse<TVShow>
    | MainTitleResponse<People>
  >(endpoint);

  const { data, error, isLoading } = useQuery<
    | MainTitleResponse<Movie>
    | MainTitleResponse<TVShow>
    | MainTitleResponse<People>
  >({
    queryKey: [queryKey, moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant={"default"}
        title={"Movie Cards"}
        description="Loading... Please be patient"
      />
    );

  if (data?.results.length === 0)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>No results</AlertDescription>
      </Alert>
    );

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
      <MovieGrid movies={data!} imageDetails={imageDetails} />
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

export default CardsGrid;
