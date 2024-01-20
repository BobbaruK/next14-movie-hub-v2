import {
  RQ_PERSON_TRANSLATIONS_ENDPOINT,
  RQ_PERSON_TRANSLATIONS_KEY,
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

const PersonTranslationsLayout = async ({
  params: { id },
  children,
}: Props) => {
  const queryClient = new QueryClient();

  // Translations
  const apiClientPersonTranslations = new MyAPIClient<TranslationsBase>(
    RQ_PERSON_TRANSLATIONS_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_PERSON_TRANSLATIONS_KEY(id)],
    queryFn: () => apiClientPersonTranslations.getAll(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </>
  );
};

export default PersonTranslationsLayout;
