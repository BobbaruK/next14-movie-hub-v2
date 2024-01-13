"use client";

import { RQ_LANGUAGES_ENDPOINT, RQ_LANGUAGES_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Language } from "@/types/movies/Language";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
  endpoint: string;
}

const OriginalLanguage = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<MovieResponse | TVShowResponse>(
    endpoint,
  );
  const { data, error, isLoading } = useQuery<MovieResponse | TVShowResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
  });

  const apiClientLanguage = new MyAPIClient<Language[]>(RQ_LANGUAGES_ENDPOINT);
  const {
    data: languages,
    error: languagesError,
    isLoading: languagesIsLoading,
  } = useQuery<Language[]>({
    queryKey: [RQ_LANGUAGES_KEY],
    queryFn: () => apiClientLanguage.getAll(),
  });

  const originalLang = languages?.find(
    (lang) => lang.iso_639_1 === data?.original_language,
  );

  if (error) throw new Error(`${queryKey} - ${error.message}`);
  if (languagesError)
    throw new Error(`${queryKey} - ${languagesError.message}`);

  if (isLoading || languagesIsLoading)
    return <div className="alert alert-info">Loading original language...</div>;

  return (
    <>
      {data?.original_language && (
        <div>
          <h3>Original Language</h3>
          <p>{originalLang?.english_name}</p>
        </div>
      )}
    </>
  );
};

export default OriginalLanguage;
