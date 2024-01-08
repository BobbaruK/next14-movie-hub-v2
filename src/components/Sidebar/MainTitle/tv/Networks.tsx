"use client";

import ImageTMDB from "@/components/ImageTMDB";
import { RQ_CONFIG_ENDPOINT, RQ_CONFIG_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Image_Configuration } from "@/types/TMDB_API_Configuration";
import { LogoSizes } from "@/types/imageSizes";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import imageLink from "@/utils/imageLink";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import config from "next/config";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Networks = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<TVShowResponse>(endpoint);
  const { data, error, isLoading } = useQuery<TVShowResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
    placeholderData: keepPreviousData,
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
    return <div className="alert alert-info">Loading networks...</div>;

  return (
    <>
      {data?.type && (
        <div>
          <h3>Networks</h3>
          <ol className="flex flex-col gap-3">
            {data.networks.map((network) => (
              <li key={network.id}>
                <ImageTMDB
                  type="poster"
                  alt={network.name}
                  src={imageLink<LogoSizes>(
                    config?.images.secure_base_url!,
                    "w92",
                    network.logo_path,
                  )}
                  width={92}
                  height={28}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};

export default Networks;
