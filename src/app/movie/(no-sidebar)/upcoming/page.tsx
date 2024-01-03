import {
  RQ_NOW_PLAYING_MOVIES_KEY,
  RQ_UPCOMING_MOVIES_ENDPOINT,
  RQ_UPCOMING_MOVIES_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MovieFilterParams } from "@/types/QueryParams";
import { MoviesResponse } from "@/types/movies/movie/MoviesResponse";
import moviesFetchConfig from "@/utils/moviesFetchConfig";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import Link from "next/link";
import MoviesGridSection from "../../MoviesGridSection";

interface Props {
  searchParams: MovieFilterParams;
}

export default async function UpcomingMovies({
  searchParams: { page, with_original_language, sort_by },
}: Props) {
  const pageNumber = parseInt(page);

  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_original_language,
    sort_by,
  );

  const apiClient = new MyAPIClient<MoviesResponse>(
    RQ_UPCOMING_MOVIES_ENDPOINT,
  );

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_UPCOMING_MOVIES_KEY, moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="appContaier flex flex-col gap-8 lg:flex-row">
          <div>
            <MoviesGridSection
              page={pageNumber}
              sort_by={sort_by}
              with_original_language={with_original_language}
              queryKey={RQ_UPCOMING_MOVIES_KEY}
            />
          </div>
        </div>
      </HydrationBoundary>
    </>
  );
}
