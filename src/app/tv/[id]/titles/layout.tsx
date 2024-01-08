import {
  RQ_COUNTRIES_ENDPOINT,
  RQ_COUNTRIES_KEY,
  RQ_TVSHOW_ALTERNATIVE_TITLES_ENDPOINT,
  RQ_TVSHOW_ALTERNATIVE_TITLES_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Country } from "@/types/Country";
import { TVShowAlternativeTitles } from "@/types/movies/tv/TVShowAlternativeTitles";
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

const MovieTranslationsLayout = async ({ params: { id }, children }: Props) => {
  const queryClient = new QueryClient();

  // Recommendations
  const apiClientAlternativeTitles = new MyAPIClient<TVShowAlternativeTitles>(
    RQ_TVSHOW_ALTERNATIVE_TITLES_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_ALTERNATIVE_TITLES_KEY(id)],
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

export default MovieTranslationsLayout;
