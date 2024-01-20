import {
  RQ_TVSHOW_TRANSLATIONS_ENDPOINT,
  RQ_TVSHOW_TRANSLATIONS_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { TranslationsBase } from "@/types/movies/TranslationsResponse";
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
  const apiClientAlternativeTitles = new MyAPIClient<TranslationsBase>(
    RQ_TVSHOW_TRANSLATIONS_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_TRANSLATIONS_KEY(id)],
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
