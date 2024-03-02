"use client";

import CustomAlert from "@/components/CustomAlert";
import Rating from "@/components/Rating";
import SocialMediaLinks from "@/components/Sidebar/MainTitle/SocialMediaLinks";
import TMDBImages from "@/components/TMDBImages";
import { Badge } from "@/components/ui/badge";
import { RQ_TVSHOW_EPISODE_EXTERNAL_IDS_KEY } from "@/constants";
import { EpisodeResponse } from "@/types/movies/tv/EpisodeResponse";
import idTitleHyphen from "@/utils/idTitleHyphen";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import EpisodeCast from "./Cast";

interface Props {
  queryKey: string;
}

const Episode = ({ queryKey }: Props) => {
  const { id, seasonNumber, episodeNumber } = useParams<{
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  }>();

  const { data, error, isLoading } = useQuery<EpisodeResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <div className="container">
        <CustomAlert
          variant="default"
          title={"Episode"}
          description="Loading... Please be patient"
        />
      </div>
    );

  return (
    <div className="container flex flex-col gap-8">
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
            queryKeyExternalIds={RQ_TVSHOW_EPISODE_EXTERNAL_IDS_KEY(
              id,
              seasonNumber,
              episodeNumber,
            )}
          />
        </div>
      </div>
      <p>{data?.overview}</p>
      <EpisodeCast episodeResponse={data} />
    </div>
  );
};

export default Episode;
