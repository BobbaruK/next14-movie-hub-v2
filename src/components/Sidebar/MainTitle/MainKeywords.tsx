"use client";

import MyAPIClient from "@/services/myApiClient";
import { MovieKeywords } from "@/types/movies/movie/MovieKeywords";
import { TVShowKeywords } from "@/types/movies/tv/TVShowKeywords";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
  endpoint: string;
}

const MainKeywords = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitleKeywords = new MyAPIClient<
    MovieKeywords | TVShowKeywords
  >(endpoint);
  const { data, error, isLoading } = useQuery<MovieKeywords | TVShowKeywords>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitleKeywords.getAll(),
  });

  if (error)
    return (
      <div className="alert alert-error">
        {queryKey}: {error.message}
      </div>
    );

  if (isLoading)
    return <div className="alert alert-warning">Loading keywords...</div>;

  const keywords = "keywords" in data! ? data.keywords : data?.results;

  return (
    <>
      {keywords && keywords?.length > 0 && (
        <div>
          <h3>Keywords</h3>
          <div className="flex flex-wrap gap-1">
            {keywords?.map((keyword) => (
              <div key={keyword.id} className="badge badge-neutral p-3">
                {keyword.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MainKeywords;
