"use client";

import { RQ_CONFIG_ENDPOINT, RQ_CONFIG_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Image_Configuration } from "@/types/TMDB_API_Configuration";
import { PosterSizes, ProfileSizes } from "@/types/imageSizes";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import imageLink from "@/utils/imageLink";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ImageTMDB from "./ImageTMDB";
import { FaStar } from "react-icons/fa";
import ReleaseDateUI from "@/utils/releaseDateUI";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Seasons = ({ queryKey, endpoint }: Props) => {
  const { id } = useParams<{ id: string }>();

  const apiClient = new MyAPIClient<TVShowResponse>(endpoint);
  const { data, error, isLoading } = useQuery<TVShowResponse>({
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
        <div className="alert alert-info">Loading tv show seasons...</div>
      </div>
    );

  const seasons = data?.seasons;
  console.log(id);

  return (
    <div className="flex flex-col gap-8">
      {seasons?.map((season) => (
        <div key={season.id} className="border-b-[1px] border-primary pb-8">
          <div className="appContaier flex flex-col gap-4 lg:flex-row">
            <div className="flex items-center justify-start md:basis-[154px]">
              <div className="inline-block overflow-hidden rounded-md [&>img]:object-cover">
                <Link href={`/tv/${id}/seasons/${season.id}`}>
                  <ImageTMDB
                    type="poster"
                    alt={season.name}
                    src={imageLink<PosterSizes>(
                      config?.images.secure_base_url!,
                      "w154",
                      season.poster_path,
                    )}
                    width={154}
                    height={231}
                    priority
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-4 py-4 md:basis-[100%]">
              <div>
                <h2 className="m-0">
                  <Link href={`/tv/${id}/seasons/${season.id}`}>
                    {season.name}
                  </Link>
                </h2>
                <p className="flex gap-3">
                  <span className="flex items-center gap-2 rounded-md bg-black px-2">
                    <FaStar /> {season.vote_average}
                  </span>
                  <span>{ReleaseDateUI(season.air_date).year}</span>
                  &bull;
                  <span>{season.episode_count} Episodes</span>
                </p>
              </div>
              <p>
                Season {season.season_number} of {data?.name} premiered on{" "}
                {ReleaseDateUI(season.air_date).releaseDate}
              </p>
              <p>{season.overview}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Seasons;
