"use client";

import Rating from "@/components/Rating";
import TMDBImages from "@/components/TMDBImages";
import MyAPIClient from "@/services/myApiClient";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import idTitleHyphen from "@/utils/idTitleHyphen";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaCalendarAlt } from "react-icons/fa";

interface Props {
  queryKey: string;
  endpoint: string;
}

const MainTitleCurrentSeason = ({ queryKey, endpoint }: Props) => {
  const { id } = useParams<{
    id: string;
  }>();

  const apiClientMainTitle = new MyAPIClient<TVShowResponse>(endpoint);
  const { data, error, isLoading } = useQuery<TVShowResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-warning">Loading current season...</div>;

  const nrOfSeasons = data?.seasons.length! - 1;
  const lastSeason = data?.seasons[nrOfSeasons]!;

  return (
    <div>
      <div>
        <div>
          <h2>Current Season</h2>
        </div>
        <div className="card flex flex-row overflow-hidden bg-base-100 shadow-md shadow-primary">
          <div className="basis-1/5 [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
            <Link href={`/tv/${id}/seasons/${lastSeason.season_number}/`}>
              <TMDBImages
                type={{ type: "poster", size: "w185" }}
                alt={lastSeason.name}
                src={lastSeason.poster_path}
                width={185}
                height={278}
              />
            </Link>
          </div>
          <div className="card-body relative flex flex-shrink basis-4/5 justify-between gap-2 p-4">
            <div className="flex flex-col">
              <h3 className="m-0">
                <Link href={`/tv/${id}/seasons/${lastSeason.season_number}`}>
                  {lastSeason.name}
                </Link>
              </h3>
              <div className="flex flex-row gap-4">
                <Rating vote={lastSeason.vote_average} />
                <div>{ReleaseDateUI(lastSeason.air_date).year}</div>
                &bull;
                <div>{lastSeason.episode_count} Episodes</div>
              </div>
            </div>
            <div>
              {lastSeason.overview.length < 400
                ? lastSeason.overview
                : lastSeason.overview.substring(0, 400) + "..."}
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              <Link
                href={`/tv/${id}/seasons/${
                  lastSeason.season_number
                }/${idTitleHyphen(
                  data?.last_episode_to_air.episode_number!,
                  data?.last_episode_to_air.name!,
                )}`}
              >
                {data?.last_episode_to_air.name} (
                {data?.last_episode_to_air.season_number}&times;
                {data?.last_episode_to_air.episode_number},{" "}
                {ReleaseDateUI(data?.last_episode_to_air.air_date).releaseDate})
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4">
        <Link href={`/tv/${id}/seasons`}>View all seasons</Link>
      </div>
    </div>
  );
};

export default MainTitleCurrentSeason;
