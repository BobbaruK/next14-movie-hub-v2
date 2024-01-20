"use client";

import ImageTMDB from "@/components/ImageTMDB";
import Rating from "@/components/Rating";
import SocialMediaLinks from "@/components/Sidebar/MainTitle/SocialMediaLinks";
import {
  RQ_CONFIG_ENDPOINT,
  RQ_CONFIG_KEY,
  RQ_SEASON_EXTERNAL_IDS_ENDPOINT,
  RQ_SEASON_EXTERNAL_IDS_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Image_Configuration } from "@/types/TMDB_API_Configuration";
import { PosterSizes, StillSizes } from "@/types/imageSizes";
import { SeasonResponse } from "@/types/movies/tv/SeasonResponse";
import idTitleHyphen from "@/utils/idTitleHyphen";
import imageLink from "@/utils/imageLink";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Season = ({ queryKey, endpoint }: Props) => {
  const { id, seasonNumber } = useParams<{
    id: string;
    seasonNumber: string;
  }>();

  const apiClient = new MyAPIClient<SeasonResponse>(endpoint);

  const { data, error, isLoading } = useQuery<SeasonResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
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
        <div className="alert alert-warning">
          Loading tv show&apos;s season...
        </div>
      </div>
    );

  return (
    <div className="appContaier">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex items-center sm:basis-[185px]  sm:justify-center">
          <div className="overflow-hidden rounded-md">
            <ImageTMDB
              type="poster"
              alt={data?.name!}
              src={imageLink<PosterSizes>(
                config?.images.secure_base_url!,
                "w185",
                data?.poster_path!,
              )}
              width={185}
              height={278}
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-4 py-4  sm:basis-[100%]">
          <div>
            <h2 className="m-0">{data?.name}</h2>
            <p className="flex gap-3">
              <Rating vote={data?.vote_average!} />
              <span>
                Season {seasonNumber} of {data?.name} premiered on{" "}
                {ReleaseDateUI(data?.air_date).releaseDate}
              </span>
            </p>
          </div>
          <p>{data?.overview}</p>
          <SocialMediaLinks
            queryKeyMainTitle={queryKey}
            endpointMainTitle={endpoint}
            queryKeyExternalIds={RQ_SEASON_EXTERNAL_IDS_KEY(id, seasonNumber)}
            endpointExternalIds={RQ_SEASON_EXTERNAL_IDS_ENDPOINT(
              id,
              seasonNumber,
            )}
          />
        </div>
      </div>
      <div className="my-20 flex flex-col items-start justify-center gap-8">
        {data?.episodes.map((episode) => (
          <div
            key={episode.id}
            className="flex flex-col items-start justify-center gap-4 md:flex-row"
          >
            <div className="overflow-hidden rounded-md">
              <Link
                href={`/tv/${id}/seasons/${seasonNumber}/${idTitleHyphen(
                  episode.episode_number,
                  episode.name,
                )}`}
              >
                <ImageTMDB
                  type="poster"
                  alt={data?.name!}
                  src={imageLink<StillSizes>(
                    config?.images.secure_base_url!,
                    "w185",
                    episode.still_path,
                  )}
                  width={185}
                  height={104}
                />
              </Link>
            </div>
            <div className="flex flex-col justify-center gap-4 py-4">
              <h3 className="m-0">
                <Link
                  href={`/tv/${id}/seasons/${seasonNumber}/${idTitleHyphen(
                    episode.episode_number,
                    episode.name,
                  )}`}
                >
                  {episode.episode_number}. {episode.name}
                </Link>
              </h3>
              <p className="flex gap-3">
                <Rating vote={episode.vote_average} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Season;
