"use client";

import Rating from "@/components/Rating";
import SocialMediaLinks from "@/components/Sidebar/MainTitle/SocialMediaLinks";
import TMDBImages from "@/components/TMDBImages";
import { Badge } from "@/components/ui/badge";
import {
  RQ_TVSHOW_EPISODE_EXTERNAL_IDS_ENDPOINT,
  RQ_TVSHOW_EPISODE_EXTERNAL_IDS_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { EpisodeResponse } from "@/types/movies/tv/EpisodeResponse";
import idTitleHyphen from "@/utils/idTitleHyphen";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Episode = ({ queryKey, endpoint }: Props) => {
  const { id, seasonNumber, episodeNumber } = useParams<{
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  }>();

  const apiClient = new MyAPIClient<EpisodeResponse>(endpoint);

  const { data, error, isLoading } = useQuery<EpisodeResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <div className="appContaier">
        <div className="alert alert-warning">
          Loading tv show&apos;s episode...
        </div>
      </div>
    );

  return (
    <div className="appContaier flex flex-col gap-8">
      <p>
        <Link href={`/tv/${id}/seasons/${seasonNumber}`}>
          Season {seasonNumber}
        </Link>{" "}
        Episode {data?.episode_number}
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex items-center sm:basis-[300px]  sm:justify-center">
          <TMDBImages
            type="still"
            alt={data?.name!}
            src={data?.still_path!}
            sizes={`
              (max-width: 320px) 200px,
              (max-width: 639px) 590px,
              240px
            `}
            className="h-episodeImageHeight w-full overflow-hidden rounded-md sm:h-36"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-4 py-4  sm:basis-[100%]">
          <div>
            <h2 className="m-0">{data?.name}</h2>
            <p className="flex gap-3">
              <Rating vote={data?.vote_average!} />
              <span>{ReleaseDateUI(data?.air_date).releaseDate}</span>
              &bull;
              <span>{data?.runtime}m</span>
            </p>
          </div>
          <SocialMediaLinks
            queryKeyMainTitle={queryKey}
            endpointMainTitle={endpoint}
            queryKeyExternalIds={RQ_TVSHOW_EPISODE_EXTERNAL_IDS_KEY(
              id,
              seasonNumber,
              episodeNumber,
            )}
            endpointExternalIds={RQ_TVSHOW_EPISODE_EXTERNAL_IDS_ENDPOINT(
              id,
              seasonNumber,
              episodeNumber,
            )}
          />
        </div>
      </div>
      <p>{data?.overview}</p>

      <div className="flex flex-col gap-16 md:flex-row md:gap-0">
        <div className="md:basis-2/4">
          <h3 className="flex flex-row flex-wrap items-center gap-4">
            Guest stars{" "}
            <Badge variant="secondary">{data?.guest_stars.length}</Badge>
          </h3>
          <div className="flex flex-col flex-wrap gap-8">
            {data?.guest_stars.map((star) => (
              <div key={star.id} className="flex flex-row gap-4">
                <Link href={`/person/${idTitleHyphen(star.id, star.name)}`}>
                  <TMDBImages
                    type="profile"
                    alt={star.name}
                    src={star.profile_path}
                    sizes="80px"
                    className="h-32 w-20 rounded-lg"
                  />
                </Link>
                <div className="flex flex-col items-start justify-center gap-1">
                  <h4>
                    <Link href={`/person/${idTitleHyphen(star.id, star.name)}`}>
                      {star.name}
                    </Link>
                  </h4>
                  <div>{star.character}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:basis-2/4">
          <h3 className="flex flex-row flex-wrap items-center gap-4">
            Crew <Badge variant="secondary">{data?.crew.length}</Badge>
          </h3>
          <div className="flex flex-col flex-wrap gap-8">
            {data?.crew.map((star) => (
              <div key={star.id} className="flex flex-row gap-4">
                <Link href={`/person/${idTitleHyphen(star.id, star.name)}`}>
                  <TMDBImages
                    type="profile"
                    alt={star.name}
                    src={star.profile_path}
                    sizes="80px"
                    className="h-32 w-20 rounded-lg"
                  />
                </Link>
                <div className="flex flex-col items-start justify-center gap-1">
                  <h4>
                    <Link href={`/person/${idTitleHyphen(star.id, star.name)}`}>
                      {star.name}
                    </Link>
                  </h4>
                  <div>{star.department}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episode;
