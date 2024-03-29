import { FilteringMovies } from "@/components/Sidebar/FilteringMovies";
import CardsGrid from "@/components/layouts/CardsGrid";
import {
  RQ_LANGUAGES_ENDPOINT,
  RQ_LANGUAGES_KEY,
  RQ_MOVIES_GENRES_ENDPOINT,
  RQ_MOVIES_GENRES_KEY,
  RQ_POPULAR_MOVIES_ENDPOINT,
  RQ_POPULAR_MOVIES_KEY,
  imagesSizesWithSidebar,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { MovieFilterParams } from "@/types/QueryParams";
import { GenreResponse } from "@/types/movies/GenreResponse";
import { Language } from "@/types/movies/Language";
import { Movie } from "@/types/movies/movie/MoviesResponse";
import moviesFetchConfig from "@/utils/moviesFetchConfig";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

const pageTitle = `Popular Movies`;

export const metadata: Metadata = {
  title: pageTitle,
};

interface Props {
  searchParams: MovieFilterParams;
}

export default async function PopularMovies({
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

  const apiClientPopularMovies = new MyAPIClient<MainTitleResponse<Movie>>(
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

  const apiClientGenres = new MyAPIClient<GenreResponse>(
    RQ_MOVIES_GENRES_ENDPOINT,
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIES_GENRES_KEY],
    queryFn: () => apiClientGenres.getAll(),
  });

  return (
    <>
      <div className="container">
        <h1>{pageTitle}</h1>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="container flex flex-col gap-8 lg:flex-row">
          <div className="lg:basis-1/4">
            <FilteringMovies genresRQKey={RQ_MOVIES_GENRES_KEY} />
          </div>
          <div className="lg:basis-3/4">
            <CardsGrid
              queryKey={RQ_POPULAR_MOVIES_KEY}
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
                type: "poster",
              }}
            />
          </div>
        </div>
      </HydrationBoundary>
    </>
  );
}
