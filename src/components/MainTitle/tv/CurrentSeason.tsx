"use client";

import Rating from "@/components/Rating";
import TMDBImages from "@/components/TMDBImages";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
        <Card className="flex flex-col items-center overflow-hidden md:flex-row md:items-stretch">
          <Link
            href={`/tv/${id}/seasons/${lastSeason.season_number}/`}
            className="flex items-center justify-center md:basis-1/5 md:items-start md:justify-start"
          >
            <TMDBImages
              type={{ type: "poster", size: "w185" }}
              alt={lastSeason.name}
              src={lastSeason.poster_path}
              width={185}
              height={278}
            />
          </Link>
          <div className="flex flex-col justify-between gap-4 md:basis-4/5">
            <CardHeader className="flex flex-col text-center md:text-start">
              <CardTitle>
                <Link href={`/tv/${id}/seasons/${lastSeason.season_number}`}>
                  {lastSeason.name}
                </Link>
              </CardTitle>
              <CardDescription className="flex flex-row justify-center gap-4 md:justify-start">
                <Rating vote={lastSeason.vote_average} />
                <div>{ReleaseDateUI(lastSeason.air_date).year}</div>
                &bull;
                <div>{lastSeason.episode_count} Episodes</div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                {lastSeason.overview.length < 200
                  ? lastSeason.overview
                  : lastSeason.overview.substring(0, 200) + "..."}
              </p>
            </CardContent>
            <CardFooter className="flex items-center gap-2">
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
            </CardFooter>
          </div>
        </Card>
      </div>
      <div className="py-4">
        <Link href={`/tv/${id}/seasons`}>View all seasons</Link>
      </div>
    </div>
  );
};

export default MainTitleCurrentSeason;
