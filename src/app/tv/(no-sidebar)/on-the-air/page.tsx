import CardsGridSection from "@/components/CardsGridSection";
import {
  RQ_ON_THE_AIR_TVSHOW_ENDPOINT,
  RQ_ON_THE_AIR_TVSHOW_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MovieFilterParams } from "@/types/QueryParams";
import { TVShowsResponse } from "@/types/movies/tv/TVShowsResponse";
import moviesFetchConfig from "@/utils/moviesFetchConfig";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

const pageTitle = `Currently Airing TV Shows`;

export const metadata: Metadata = {
  title: pageTitle,
};

interface Props {
  searchParams: MovieFilterParams;
}

export default async function OnTheAirTVShows({
  searchParams: { page, with_genres, with_original_language, sort_by },
}: Props) {
  const pageNumber = parseInt(page);

  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_genres,
    with_original_language,
    sort_by,
  );

  const apiClient = new MyAPIClient<TVShowsResponse>(
    RQ_ON_THE_AIR_TVSHOW_ENDPOINT,
  );

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_ON_THE_AIR_TVSHOW_KEY, moviesConfig.params],
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
            <CardsGridSection
              page={pageNumber}
              with_genres={with_genres}
              sort_by={sort_by}
              with_original_language={with_original_language}
              queryKey={RQ_ON_THE_AIR_TVSHOW_KEY}
              endpoint={RQ_ON_THE_AIR_TVSHOW_ENDPOINT}
            />
          </div>
        </div>
      </HydrationBoundary>
    </>
  );
}
