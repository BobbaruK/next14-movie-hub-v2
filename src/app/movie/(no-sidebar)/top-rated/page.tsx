import CardsGrid from "@/components/layouts/CardsGrid";
import {
  RQ_TOP_RATED_MOVIES_ENDPOINT,
  RQ_TOP_RATED_MOVIES_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { MovieFilterParams } from "@/types/QueryParams";
import { Movie } from "@/types/movies/movie/MoviesResponse";
import moviesFetchConfig from "@/utils/moviesFetchConfig";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

const pageTitle = `Top Rated Movies`;

export const metadata: Metadata = {
  title: pageTitle,
};

interface Props {
  searchParams: MovieFilterParams;
}

export default async function TopRatedMovies({
  searchParams: { page, with_genres, with_original_language, sort_by },
}: Props) {
  const pageNumber = parseInt(page);

  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_genres,
    with_original_language,
    sort_by,
  );

  const apiClient = new MyAPIClient<MainTitleResponse<Movie>>(
    RQ_TOP_RATED_MOVIES_ENDPOINT,
  );

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_TOP_RATED_MOVIES_KEY, moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  return (
    <>
      <div className="appContaier">
        <h1>{pageTitle}</h1>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="appContaier flex flex-col gap-8 lg:flex-row">
          <div>
            <CardsGrid
              page={pageNumber}
              with_genres={with_genres}
              with_original_language={with_original_language}
              sort_by={sort_by}
              queryKey={RQ_TOP_RATED_MOVIES_KEY}
              endpoint={RQ_TOP_RATED_MOVIES_ENDPOINT}
            />
          </div>
        </div>
      </HydrationBoundary>
    </>
  );
}
