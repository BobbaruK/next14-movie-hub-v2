"use client";

import CustomAlert from "@/components/CustomAlert";
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

  if (isLoading) {
    return (
      <CustomAlert
        variant="default"
        title={"Current Season"}
        description="Loading... Please be patient"
      />
    );
  }

  const nrOfSeasons = data?.seasons.length! - 1;
  const lastSeason = data?.seasons[nrOfSeasons]!;

  return (
    <div>
      <div>
        <div>
          <h2>Current Season</h2>
        </div>
        <Card className="flex flex-col items-center overflow-hidden sm:flex-row md:w-full md:items-stretch">
          <Link
            href={`/tv/${id}/seasons/${lastSeason.season_number}/`}
            className="flex w-full items-center justify-center sm:basis-2/5 sm:items-start sm:justify-start md:w-full md:basis-52"
          >
            <TMDBImages
              type={{ type: "poster", size: "w185" }}
              alt={lastSeason.name}
              src={lastSeason.poster_path}
              sizes={`
                (max-width: 320px) 250px,
                (max-width: 639px) 584px,
                (max-width: 767px) 286px,
                208px
              `}
              className="h-currentSeasonImageHeight sm:h-currentSeasonImageHeight-sm md:h-[310px]"
            />
          </Link>
          <div className="flex grow flex-col justify-between gap-4 sm:basis-3/5 md:basis-0">
            <CardHeader className="flex flex-col text-center sm:text-start">
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
