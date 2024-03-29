"use client";

import { ImageDetails } from "@/types/ImageDetails";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { Movie } from "@/types/movies/movie/MoviesResponse";
import { TVShow } from "@/types/movies/tv/TVShowsResponse";
import { People } from "@/types/people/PeoplesResponse";
import moviesFetchConfig from "@/utils/moviesFetchConfig";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import CustomAlert from "../CustomAlert";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import MovieGrid from "./MovieGrid";
import MoviePagination from "./MoviePagination";
import { useSearchParams } from "next/navigation";

interface Props {
  queryKey: string;
  imageDetails: ImageDetails;
}

const CardsGrid = ({ queryKey, imageDetails }: Props) => {
  const searchParams = useSearchParams();

  const pageSearchParam = searchParams.get("page") || "1";
  const page = parseInt(pageSearchParam);
  const with_genres = searchParams.get("with_genres") || "";
  const with_original_language =
    searchParams.get("with_original_language") || "";
  const sort_by = searchParams.get("sort_by") || "";

  const moviesConfig = moviesFetchConfig(
    page,
    with_genres,
    with_original_language,
    sort_by,
  );

  const { data, error, isLoading } = useQuery<
    | MainTitleResponse<Movie>
    | MainTitleResponse<TVShow>
    | MainTitleResponse<People>
  >({
    queryKey: [queryKey, moviesConfig.params],
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
        <MoviePagination response={data!} page={page || 1} />
      </div>
      <MovieGrid movies={data!} imageDetails={imageDetails} />
      <div className="mt-4">
        <MoviePagination response={data!} page={page || 1} />
      </div>
    </>
  );
};

export default CardsGrid;
