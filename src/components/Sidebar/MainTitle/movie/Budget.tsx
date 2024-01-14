"use client";

import MyAPIClient from "@/services/myApiClient";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Budget = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<MovieResponse>(endpoint);
  const { data, error, isLoading } = useQuery<MovieResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading budget...</div>;

  return (
    <>
      <div>
        <h3>Budget</h3>
        <p>{data?.budget !== 0 ? `$${data?.budget.toLocaleString()}` : "-"}</p>
      </div>
    </>
  );
};

export default Budget;
