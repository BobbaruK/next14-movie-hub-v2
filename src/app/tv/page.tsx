import { FilteringMovies } from "@/components/Sidebar/FilteringMovies";
import CardsGrid from "@/components/layouts/CardsGrid";
import {
  RQ_LANGUAGES_ENDPOINT,
  RQ_LANGUAGES_KEY,
  RQ_POPULAR_TVSHOWS_ENDPOINT,
  RQ_POPULAR_TVSHOWS_KEY,
  RQ_TVSHOWS_GENRES_ENDPOINT,
  RQ_TVSHOWS_GENRES_KEY,
  imagesSizesWithSidebar,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { MovieFilterParams } from "@/types/QueryParams";
import { GenreResponse } from "@/types/movies/GenreResponse";
import { Language } from "@/types/movies/Language";
import { TVShow } from "@/types/movies/tv/TVShowsResponse";
import moviesFetchConfig from "@/utils/moviesFetchConfig";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

const pageTitle = `Popular TV Shows`;

export const metadata: Metadata = {
  title: pageTitle,
};

interface Props {
  searchParams: MovieFilterParams;
}

export default async function TVShows({
  searchParams: { page, with_genres, sort_by, with_original_language },
}: Props) {
  const pageNumber = parseInt(page);
  const queryClient = new QueryClient();

  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_genres,
    with_original_language,
    sort_by,
  );

  const apiClientPopularMovies = new MyAPIClient<MainTitleResponse<TVShow>>(
    RQ_POPULAR_TVSHOWS_ENDPOINT,
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_POPULAR_TVSHOWS_KEY, moviesConfig.params],
    queryFn: () => apiClientPopularMovies.getAll(moviesConfig),
  });

  const apiClientLanguages = new MyAPIClient<Language[]>(RQ_LANGUAGES_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_LANGUAGES_KEY],
    queryFn: () => apiClientLanguages.getAll(),
  });

  const apiClientGenres = new MyAPIClient<GenreResponse>(
    RQ_TVSHOWS_GENRES_ENDPOINT,
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOWS_GENRES_KEY],
    queryFn: () => apiClientGenres.getAll(),
  });

  return (
    <>
      <div className="appContaier">
        <h1>{pageTitle}</h1>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="appContaier flex flex-col gap-8 lg:flex-row">
          <div className="lg:basis-1/4">
            <FilteringMovies genresRQKey={RQ_TVSHOWS_GENRES_KEY} />
          </div>
          <div className="lg:basis-3/4">
            <CardsGrid
              page={pageNumber}
              with_genres={with_genres}
              sort_by={sort_by}
              with_original_language={with_original_language}
              queryKey={RQ_POPULAR_TVSHOWS_KEY}
              endpoint={RQ_POPULAR_TVSHOWS_ENDPOINT}
              imageDetails={{
                classes: imagesSizesWithSidebar,
                sizes: `
                    (max-width: 320px) 125px,
                    (max-width: 639px) 283px,
                    (max-width: 767px) 226px,
                    (max-width: 1023px) 230px,
                    (max-width: 1279px) 210px,
                    185px
                  `,
              }}
            />
          </div>
        </div>
      </HydrationBoundary>
    </>
  );
}
