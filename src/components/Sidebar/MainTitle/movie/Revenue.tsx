"use client";

import MyAPIClient from "@/services/myApiClient";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Revenue = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<MovieResponse>(endpoint);
  const { data, error, isLoading } = useQuery<MovieResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-warning">Loading revenue...</div>;

  return (
    <>
      <div>
        <h3>Revenue</h3>
        <p>
          {data?.revenue !== 0 ? `$${data?.revenue.toLocaleString()}` : "-"}
        </p>
      </div>
    </>
  );
};

export default Revenue;
