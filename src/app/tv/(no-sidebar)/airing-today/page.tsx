import MoviesGridSection from "@/app/movie/MoviesGridSection";
import {
  RQ_AIRING_TODAY_TVSHOWS_ENDPOINT,
  RQ_AIRING_TODAY_TVSHOWS_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MovieFilterParams } from "@/types/QueryParams";
import { MoviesResponse } from "@/types/movies/movie/MoviesResponse";
import moviesFetchConfig from "@/utils/moviesFetchConfig";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

interface Props {
  searchParams: MovieFilterParams;
}

export default async function AiringTodayTVShows({
  searchParams: { page, with_genres, with_original_language, sort_by },
}: Props) {
  const pageNumber = parseInt(page);

  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_genres,
    with_original_language,
    sort_by,
  );

  const apiClient = new MyAPIClient<MoviesResponse>(
    RQ_AIRING_TODAY_TVSHOWS_ENDPOINT,
  );

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_AIRING_TODAY_TVSHOWS_KEY, moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="appContaier flex flex-col gap-8 lg:flex-row">
          <div>
            <MoviesGridSection
              page={pageNumber}
              with_genres={with_genres}
              sort_by={sort_by}
              with_original_language={with_original_language}
              queryKey={RQ_AIRING_TODAY_TVSHOWS_KEY}
            />
          </div>
        </div>
      </HydrationBoundary>
    </>
  );
}
