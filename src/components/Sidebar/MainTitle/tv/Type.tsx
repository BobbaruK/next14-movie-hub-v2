"use client";

import MyAPIClient from "@/services/myApiClient";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Type = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<TVShowResponse>(endpoint);
  const { data, error, isLoading } = useQuery<TVShowResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading) return <div className="alert alert-warning">Loading type...</div>;

  return (
    <>
      {data?.type && (
        <div>
          <h3>Type</h3>
          <p>{data?.type}</p>
        </div>
      )}
    </>
  );
};

export default Type;
