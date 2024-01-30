"use client";

import TMDBImages from "@/components/TMDBImages";
import MyAPIClient from "@/services/myApiClient";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
  endpoint: string;
}

const ProductionCompanies = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<MovieResponse | TVShowResponse>(
    endpoint,
  );
  const { data, error, isLoading } = useQuery<MovieResponse | TVShowResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <div className="alert alert-warning">Loading production companies...</div>
    );

  return (
    <>
      {data?.production_companies.length && (
        <div>
          <h3>Production Companies</h3>
          <ol className="flex flex-col gap-3">
            {data?.production_companies.map((company) => (
              <li key={company.id}>
                {company.logo_path ? (
                  <TMDBImages
                    type={{ type: "logo", size: "w92" }}
                    alt={company.name}
                    src={company.logo_path}
                    className="h-16 w-32 object-contain [&>img]:object-contain [&>img]:object-left"
                    sizes="200px"
                  />
                ) : (
                  `${company.name}${
                    company.origin_country ? " - " + company.origin_country : ""
                  }`
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};

export default ProductionCompanies;
