"use client";

import CustomAlert from "@/components/CustomAlert";
import { RQ_LANGUAGES_KEY } from "@/constants";
import { Language } from "@/types/movies/Language";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
}

const OriginalLanguage = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<MovieResponse | TVShowResponse>({
    queryKey: [queryKey],
  });

  const {
    data: languages,
    error: languagesError,
    isLoading: languagesIsLoading,
  } = useQuery<Language[]>({
    queryKey: [RQ_LANGUAGES_KEY],
  });

  const originalLang = languages?.find(
    (lang) => lang.iso_639_1 === data?.original_language,
  );

  if (error) throw new Error(`${queryKey} - ${error.message}`);
  if (languagesError)
    throw new Error(`${queryKey} - ${languagesError.message}`);

  if (isLoading || languagesIsLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Original language"}
        description="Loading... Please be patient"
      />
    );

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
