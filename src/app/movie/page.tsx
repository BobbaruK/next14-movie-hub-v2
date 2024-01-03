import { RQ_POPULAR_MOVIES_ENDPOINT, RQ_POPULAR_MOVIES_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MoviesResponse } from "@/types/movies/movie/MoviesResponse";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import MoviesGridSection from "./MoviesGridSection";
import { MovieFilterParams } from "@/types/QueryParams";
import moviesFetchConfig from "@/utils/moviesFetchConfig";

interface Props {
  searchParams: MovieFilterParams;
}

export default async function PopularMovies({
  searchParams: { page, with_original_language, sort_by },
}: Props) {
  const pageNumber = parseInt(page);

  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_original_language,
    sort_by,
  );

  const apiClient = new MyAPIClient<MoviesResponse>(RQ_POPULAR_MOVIES_ENDPOINT);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_POPULAR_MOVIES_KEY, moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="appContaier flex flex-col gap-8 lg:flex-row">
          <div className="lg:basis-1/4">
            sidebar
          </div>
          <div className="lg:basis-3/4">
            <MoviesGridSection
              page={pageNumber}
              sort_by={sort_by}
              with_original_language={with_original_language}
              queryKey={RQ_POPULAR_MOVIES_KEY}
            />
          </div>
        </div>
      </HydrationBoundary>
    </div>
  );
}
