import {
  RQ_COUNTRIES_ENDPOINT,
  RQ_COUNTRIES_KEY,
  RQ_MOVIE_ALTERNATIVE_TITLES_ENDPOINT,
  RQ_MOVIE_ALTERNATIVE_TITLES_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Country } from "@/types/Country";
import { MovieAlternativeTitles } from "@/types/movies/movie/MovieAlternativeTitles";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { ReactNode } from "react";

interface Props {
  params: {
    id: string;
  };
  children: ReactNode;
}

const MovieTitlesLayout = async ({ params: { id }, children }: Props) => {
  const queryClient = new QueryClient();

  // Alternative Titles
  const apiClientAlternativeTitles = new MyAPIClient<MovieAlternativeTitles>(
    RQ_MOVIE_ALTERNATIVE_TITLES_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_ALTERNATIVE_TITLES_KEY(id)],
    queryFn: () => apiClientAlternativeTitles.getAll(),
  });

  // Countries
  const apiClientCountries = new MyAPIClient<Country[]>(RQ_COUNTRIES_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_COUNTRIES_KEY],
    queryFn: () => apiClientCountries.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default MovieTitlesLayout;
