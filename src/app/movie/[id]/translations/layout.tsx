import {
  RQ_COUNTRIES_ENDPOINT,
  RQ_COUNTRIES_KEY,
  RQ_MOVIE_TRANSLATIONS_ENDPOINT,
  RQ_MOVIE_TRANSLATIONS_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Country } from "@/types/Country";
import { TranslationsMovie } from "@/types/movies/TranslationsResponse";
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

  // Translations
  const apiClientAlternativeTitles = new MyAPIClient<TranslationsMovie>(
    RQ_MOVIE_TRANSLATIONS_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_TRANSLATIONS_KEY(id)],
    queryFn: () => apiClientAlternativeTitles.getAll(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </>
  );
};

export default MovieTranslationsLayout;
