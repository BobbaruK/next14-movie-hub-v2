import {
  RQ_COUNTRIES_ENDPOINT,
  RQ_COUNTRIES_KEY,
  RQ_MOVIE_RELEASES_ENDPOINT,
  RQ_MOVIE_RELEASES_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Country } from "@/types/Country";
import { ReleaseDatesResponse } from "@/types/movies/movie/ReleaseDates";
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

const MovieReleasesLayout = async ({ params: { id }, children }: Props) => {
  const queryClient = new QueryClient();

  // Release dates
  const apiClientReleases = new MyAPIClient<ReleaseDatesResponse>(
    RQ_MOVIE_RELEASES_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_RELEASES_KEY(id)],
    queryFn: () => apiClientReleases.getAll(),
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

export default MovieReleasesLayout;
