"use client";

import CustomAlert from "@/components/CustomAlert";
import { MovieKeywords } from "@/types/movies/movie/MovieKeywords";
import { TVShowKeywords } from "@/types/movies/tv/TVShowKeywords";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
}

const MainKeywords = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<MovieKeywords | TVShowKeywords>({
    queryKey: [queryKey],
  });

  if (error)
    return (
      <div className="alert alert-error">
        {queryKey}: {error.message}
      </div>
    );

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Keywords"}
        description="Loading... Please be patient"
      />
    );

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
