import { FilteringMovies } from "@/components/Sidebar/FilteringMovies";
import {
  RQ_LANGUAGES_ENDPOINT,
  RQ_LANGUAGES_KEY,
  RQ_POPULAR_MOVIES_ENDPOINT,
  RQ_POPULAR_MOVIES_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MovieFilterParams } from "@/types/QueryParams";
import { Language } from "@/types/movies/Language";
import { MoviesResponse } from "@/types/movies/movie/MoviesResponse";
import moviesFetchConfig from "@/utils/moviesFetchConfig";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import MoviesGridSection from "./MoviesGridSection";

interface Props {
  searchParams: MovieFilterParams;
}

export default async function PopularMovies({
  searchParams: { page, with_original_language, sort_by },
}: Props) {
  const pageNumber = parseInt(page);
  const queryClient = new QueryClient();

  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_original_language,
    sort_by,
  );

  const apiClientPopularMovies = new MyAPIClient<MoviesResponse>(
    RQ_POPULAR_MOVIES_ENDPOINT,
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_POPULAR_MOVIES_KEY, moviesConfig.params],
    queryFn: () => apiClientPopularMovies.getAll(moviesConfig),
  });

  const apiClientLanguages = new MyAPIClient<Language[]>(RQ_LANGUAGES_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_LANGUAGES_KEY],
    queryFn: () => apiClientLanguages.getAll(),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="appContaier flex flex-col gap-8 lg:flex-row">
          <div className="lg:basis-1/4">
            <FilteringMovies />
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
