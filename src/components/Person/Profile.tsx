"use client";

import { RQ_CONFIG_ENDPOINT, RQ_CONFIG_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Image_Configuration } from "@/types/TMDB_API_Configuration";
import { ProfileSizes } from "@/types/imageSizes";
import { PeopleResponse } from "@/types/people/PeopleResponse";
import imageLink from "@/utils/imageLink";
import { useQuery } from "@tanstack/react-query";
import ImageTMDB from "../ImageTMDB";

interface Props {
  queryKey: string;
  endpoint: string;
}

const PersonProfile = ({ endpoint, queryKey }: Props) => {
  const apiClient = new MyAPIClient<PeopleResponse>(endpoint);
  const { data, error, isLoading } = useQuery<PeopleResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
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
    return <div className="alert alert-warning">Loading person name...</div>;

  return (
    <div className="overflow-hidden rounded-md">
      <ImageTMDB
        type="poster"
        alt={data?.name!}
        src={imageLink<ProfileSizes>(
          config?.images.secure_base_url!,
          "h632",
          data?.profile_path!,
        )}
        width={421}
        height={632}
        priority
      />
    </div>
  );
};

export default PersonProfile;
