import CardsGrid from "@/components/layouts/CardsGrid";
import {
  RQ_UPCOMING_MOVIES_ENDPOINT,
  RQ_UPCOMING_MOVIES_KEY,
  imagesSizesNoSidebar,
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

const pageTitle = `Upcoming Movies`;

export const metadata: Metadata = {
  title: pageTitle,
};

interface Props {
  searchParams: MovieFilterParams;
}

export default async function UpcomingMovies({
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
    RQ_UPCOMING_MOVIES_ENDPOINT,
  );

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_UPCOMING_MOVIES_KEY, moviesConfig.params],
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
              with_genres=""
              with_original_language=""
              sort_by=""
              queryKey={RQ_UPCOMING_MOVIES_KEY}
              endpoint={RQ_UPCOMING_MOVIES_ENDPOINT}
              imageDetails={{
                classes: imagesSizesNoSidebar,
                sizes: `
                    (max-width: 320px) 125px,
                    (max-width: 639px) 283px,
                    (max-width: 767px) 226px,
                    (max-width: 1023px) 230px,
                    (max-width: 1279px) 294px,
                    260px
                  `,
              }}
            />
          </div>
        </div>
      </HydrationBoundary>
    </>
  );
}
