"use client";

import { RQ_CONFIG_ENDPOINT, RQ_CONFIG_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { TMDB_API_Configuration } from "@/types/TMDB_API_Configuration";
import { BackdropSizes, PosterSizes } from "@/types/imageSizes";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import imageLink from "@/utils/imageLink";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import ImageTMDB from "./ImageTMDB";

interface Props {
  queryKey: string;
  endpoint: string;
}

const MainTitleHeroSection = ({ queryKey, endpoint }: Props) => {
  const apiClient = new MyAPIClient<MovieResponse | TVShowResponse>(endpoint);

  const { data, error, isLoading } = useQuery<MovieResponse | TVShowResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
    placeholderData: keepPreviousData,
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <div className="appContaier">
        <div className="alert alert-info">
          Loading main title hero section...
        </div>
      </div>
    );

  const apiClientConfig = new MyAPIClient<TMDB_API_Configuration>(
    RQ_CONFIG_ENDPOINT,
  );

  const { data: config } = useQuery<TMDB_API_Configuration>({
    queryKey: [RQ_CONFIG_KEY],
    queryFn: () => apiClientConfig.getAll(),
  });

  const { releaseDate, year } = ReleaseDateUI(
    "title" in data! ? data.release_date : data?.first_air_date,
  );

  return (
    <div className="relative py-20">
      <div className="absolute inset-0 z-0 h-full w-full">
        <div className="absolute inset-0 -z-20  h-full w-full [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
          <ImageTMDB
            type="poster"
            alt={"title" in data! ? data.title : data?.name!}
            src={imageLink<BackdropSizes>(
              config?.images.secure_base_url!,
              "original",
              data?.backdrop_path!,
            )}
            width={3840}
            height={2160}
            priority
          />
        </div>
        <div className="absolute inset-0 -z-10  h-full w-full bg-primary bg-gradient-to-r from-primary to-secondary opacity-90"></div>
      </div>
      <div className="relative z-0">
        <div className="appContaier flex flex-col gap-8 text-primary-content md:flex-row">
          <div className="flex items-center justify-center sm:basis-2/6 lg:basis-1/4">
            <div className="max-w-[342px] overflow-hidden rounded-lg">
              <ImageTMDB
                type="poster"
                alt={"title" in data! ? data.title : data?.name!}
                src={imageLink<PosterSizes>(
                  config?.images.secure_base_url!,
                  "w342",
                  data?.poster_path!,
                )}
                width={342}
                height={513}
                priority
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-8 sm:basis-4/6 lg:basis-3/4">
            <h1 className="m-0">
              {"title" in data! ? data.title : data?.name} ({year})
            </h1>
            <div className="flex flex-wrap gap-4">
              <div className="">{releaseDate}</div>
              &bull;
              <div className="">
                {data?.genres.map((genre, index) => (
                  <React.Fragment key={genre.id}>
                    <span>{genre.name}</span>
                    {data.genres.length === index + 1 ? "" : ","}&nbsp;
                  </React.Fragment>
                ))}
              </div>
              &bull;
              <div className="">
                {"title" in data!
                  ? `${data?.runtime} minutes`
                  : data?.episode_run_time.length
                    ? `${data?.episode_run_time[0]} minutes`
                    : "unknowm"}
              </div>
            </div>
            {data?.tagline && (
              <p>
                <em>{data?.tagline}</em>
              </p>
            )}
            {data?.overview && <p>{data?.overview}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTitleHeroSection;
