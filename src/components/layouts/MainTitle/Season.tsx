"use client";

import Rating from "@/components/Rating";
import SocialMediaLinks from "@/components/Sidebar/MainTitle/SocialMediaLinks";
import TMDBImages from "@/components/TMDBImages";
import {
  RQ_SEASON_EXTERNAL_IDS_ENDPOINT,
  RQ_SEASON_EXTERNAL_IDS_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { SeasonResponse } from "@/types/movies/tv/SeasonResponse";
import idTitleHyphen from "@/utils/idTitleHyphen";
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
            <TMDBImages
              type={{ type: "poster", size: "w185" }}
              alt={data?.name!}
              src={data?.poster_path!}
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
                <TMDBImages
                  type={{ type: "still", size: "w185" }}
                  alt={data?.name!}
                  src={episode.still_path}
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
