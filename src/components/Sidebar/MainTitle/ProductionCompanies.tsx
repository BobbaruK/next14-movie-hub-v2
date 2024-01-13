"use client";

import ImageTMDB from "@/components/ImageTMDB";
import { RQ_CONFIG_ENDPOINT, RQ_CONFIG_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Image_Configuration } from "@/types/TMDB_API_Configuration";
import { LogoSizes } from "@/types/imageSizes";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import imageLink from "@/utils/imageLink";
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

  const apiClientConfig = new MyAPIClient<Image_Configuration>(
    RQ_CONFIG_ENDPOINT,
  );
  const {
    data: config,
    error: configError,
    isLoading: isLoadingError,
  } = useQuery<Image_Configuration>({
    queryKey: [RQ_CONFIG_KEY],
    queryFn: () => apiClientConfig.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);
  if (configError) throw new Error(`${queryKey} - ${configError.message}`);

  if (isLoading || isLoadingError)
    return (
      <div className="alert alert-info">Loading production companies...</div>
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
                  <ImageTMDB
                    type="poster"
                    alt={company.name}
                    src={imageLink<LogoSizes>(
                      config?.images.secure_base_url!,
                      "w92",
                      company.logo_path,
                    )}
                    width={92}
                    height={28}
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
