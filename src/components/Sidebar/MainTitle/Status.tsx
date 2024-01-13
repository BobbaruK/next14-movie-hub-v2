"use client";

import MyAPIClient from "@/services/myApiClient";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Status = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<MovieResponse | TVShowResponse>(
    endpoint,
  );
  const { data, error, isLoading } = useQuery<MovieResponse | TVShowResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading status...</div>;

  return (
    <>
      {data?.status && (
        <div>
          <h3>Status</h3>
          <p>{data?.status}</p>
        </div>
      )}
    </>
  );
};

export default Status;
