"use client";

import ImageTMDB from "@/components/ImageTMDB";
import MyAPIClient from "@/services/myApiClient";
import { PosterSizes } from "@/types/imageSizes";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import imageLink from "@/utils/imageLink";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FaCalendarAlt, FaStar } from "react-icons/fa";

interface Props {
  queryKey: string;
  endpoint: string;
}

// TODO: config here on the image

const MainTitleCurrentSeason = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<TVShowResponse>(endpoint);
  const { data, error, isLoading } = useQuery<TVShowResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
    placeholderData: keepPreviousData,
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading current season...</div>;

  const nrOfSeasons = data?.seasons.length! - 1;
  const lastSeason = data?.seasons[nrOfSeasons]!;

  return (
    <div>
      <div>
        <h2>Current Season</h2>
      </div>
      <div className="card mb-5 flex flex-row overflow-hidden bg-base-100 shadow-md shadow-primary">
        <div className="basis-1/5 [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
          {/* <div className=" w-[185px] [&>img]:h-[278px] [&>img]:w-[185px]"> */}
          <ImageTMDB
            type="poster"
            alt={lastSeason.name}
            src={imageLink<PosterSizes>(
              "https://image.tmdb.org/t/p/",
              "w185",
              lastSeason.poster_path,
            )}
            width={185}
            height={278}
          />
        </div>
        <div className="card-body relative flex flex-shrink basis-4/5 justify-between gap-2 p-4">
          <div className="flex flex-col">
            <h3 className="m-0">{lastSeason.name}</h3>
            <div className="flex flex-row gap-4">
              <div className="flex items-center gap-2 rounded-md bg-black px-2">
                <FaStar /> {lastSeason.vote_average}
              </div>
              <div>{ReleaseDateUI(lastSeason.air_date).year}</div>
              &bull;
              <div>{lastSeason.episode_count} Episodes</div>
            </div>
          </div>
          <div>{lastSeason.overview}</div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt />
            {data?.last_episode_to_air.name} (
            {data?.last_episode_to_air.season_number}&times;
            {data?.last_episode_to_air.episode_number},{" "}
            {ReleaseDateUI(data?.last_episode_to_air.air_date).releaseDate})
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTitleCurrentSeason;
