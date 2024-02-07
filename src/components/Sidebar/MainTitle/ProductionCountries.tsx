"use client";

import CustomAlert from "@/components/CustomAlert";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
}

const ProductionCountries = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<MovieResponse | TVShowResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Production Countries"}
        description="Loading... Please be patient"
      />
    );

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
