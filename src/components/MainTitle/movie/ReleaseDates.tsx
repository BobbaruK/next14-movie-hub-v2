"use client";

import ReleaseDateCard from "@/components/Cards/ReleaseDate";
import MyAPIClient from "@/services/myApiClient";
import { ReleaseDatesResponse } from "@/types/movies/movie/ReleaseDates";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
  endpoint: string;
}

const ReleaseDates = ({ queryKey, endpoint }: Props) => {
  const apiClientReleases = new MyAPIClient<ReleaseDatesResponse>(endpoint);
  const { data, error, isLoading } = useQuery<ReleaseDatesResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientReleases.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-warning">Loading release dates...</div>;

  if (data?.results.length === 0)
    return <div className="alert alert-warning">No results</div>;

  return (
    <div className="flex flex-col gap-8">
      {data?.results
        .sort((a, b) => {
          if (a.iso_3166_1 < b.iso_3166_1) {
            return -1;
          }
          if (a.iso_3166_1 > b.iso_3166_1) {
            return 1;
          }
          return 0;
        })
        .map((date) => (
          <ReleaseDateCard releaseDate={date} key={date.iso_3166_1} />
        ))}
    </div>
  );
};

export default ReleaseDates;
