"use client";

import MyAPIClient from "@/services/myApiClient";
import { TranslationsBase } from "@/types/movies/TranslationsResponse";
import { useQuery } from "@tanstack/react-query";
import TranslationCard from "../Cards/Translation";

interface Props {
  queryKey: string;
  endpoint: string;
}

const MainTitleTranslations = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<TranslationsBase>(endpoint);
  const { data, error, isLoading } = useQuery<TranslationsBase>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-warning">Loading translations...</div>;

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
