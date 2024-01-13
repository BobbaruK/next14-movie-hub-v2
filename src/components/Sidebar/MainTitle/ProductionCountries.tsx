"use client";

import MyAPIClient from "@/services/myApiClient";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
  endpoint: string;
}

const ProductionCountries = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<MovieResponse | TVShowResponse>(
    endpoint,
  );
  const { data, error, isLoading } = useQuery<MovieResponse | TVShowResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading production countries...</div>;

  return (
    <>
      {data?.production_countries && (
        <div>
          <h3>Production Countries</h3>
          <ol className="flex flex-col gap-3">
            {data?.production_countries.map((country) => (
              <li key={country.iso_3166_1}>{country.name}</li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};

export default ProductionCountries;
