"use client";

import MyAPIClient from "@/services/myApiClient";
import {
  TranslationsMovie,
  TranslationsTV,
} from "@/types/movies/TranslationsResponse";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import TranslationCard from "../TranslationCard";

interface Props {
  queryKey: string;
  endpoint: string;
}

const MainTitleTranslations = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<
    TranslationsMovie | TranslationsTV
  >(endpoint);
  const { data, error, isLoading } = useQuery<
    TranslationsMovie | TranslationsTV
  >({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
    placeholderData: keepPreviousData,
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading translations...</div>;

  if (data?.translations.length === 0)
    return <div className="alert alert-warning">No results</div>;

  return (
    <div className="flex flex-col gap-8">
      {data?.translations
        .sort((a, b) => {
          if (a.english_name < b.english_name) {
            return -1;
          }
          if (a.english_name > b.english_name) {
            return 1;
          }
          return 0;
        })
        .map((translation, index) => (
          <TranslationCard
            translation={translation}
            key={translation.iso_3166_1 + index}
          />
        ))}
    </div>
  );
};

export default MainTitleTranslations;
