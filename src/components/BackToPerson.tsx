"use client";

import { RQ_CONFIG_ENDPOINT, RQ_CONFIG_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Image_Configuration } from "@/types/TMDB_API_Configuration";
import { PosterSizes, ProfileSizes } from "@/types/imageSizes";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import imageLink from "@/utils/imageLink";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import ImageTMDB from "./ImageTMDB";
import Link from "next/link";
import { People } from "@/types/people/PeoplesResponse";

interface BackTo {
  label: string;
  link: string;
}

interface Props {
  queryKey: string;
  endpoint: string;
  backTo: BackTo;
}

const BackToPerson = ({ queryKey, endpoint, backTo }: Props) => {
  const apiClient = new MyAPIClient<People>(endpoint);
  const { data, error, isLoading } = useQuery<People>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
    placeholderData: keepPreviousData,
  });

  const apiClientConfig = new MyAPIClient<Image_Configuration>(
    RQ_CONFIG_ENDPOINT,
  );
  const { data: config } = useQuery<Image_Configuration>({
    queryKey: [RQ_CONFIG_KEY],
    queryFn: () => apiClientConfig.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <div className="appContaier">
        <div className="alert alert-info">Loading main title...</div>
      </div>
    );

  return (
    <div className="mb-10 bg-gradient-to-r from-secondary via-primary to-neutral py-4 text-secondary-content">
      <div className="appContaier">
        <div className="flex gap-5">
          <div className="overflow-hidden rounded-md">
            <Link href={backTo.link}>
              <ImageTMDB
                type="poster"
                alt={data?.name!}
                src={imageLink<ProfileSizes>(
                  config?.images.secure_base_url!,
                  "w185",
                  data?.profile_path!,
                )}
                width={92}
                height={138}
                priority
              />
            </Link>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <h1 className="m-0">
              <Link href={backTo.link}>{data?.name}</Link>
            </h1>
            <Link href={backTo.link} className="flex items-center gap-4">
              <BsFillArrowLeftCircleFill /> Back to {backTo.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackToPerson;
