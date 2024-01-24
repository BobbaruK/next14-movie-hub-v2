"use client";

import MyAPIClient from "@/services/myApiClient";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import TMDBImages from "../TMDBImages";

interface Props {
  queryKey: string;
  endpoint: string;
}

const MainTitleHeroSection = ({ queryKey, endpoint }: Props) => {
  const apiClient = new MyAPIClient<MovieResponse | TVShowResponse>(endpoint);
  const { data, error, isLoading } = useQuery<MovieResponse | TVShowResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <div className="appContaier">
        <div className="alert alert-warning">
          Loading main title hero section...
        </div>
      </div>
    );

  const { releaseDate, year } = ReleaseDateUI(
    "title" in data! ? data.release_date : data?.first_air_date,
  );

  const style = {
    "--value": data?.vote_average! * 10,
    "--thickness": "3px",
    "--size": "3rem",
  } as React.CSSProperties;

  return (
    <div className="relative py-20">
      <div className="absolute inset-0 z-0 h-full w-full">
        <div className="absolute inset-0 -z-20  h-full w-full [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
          <TMDBImages
            type={{ type: "backdrop", size: "original" }}
            alt={"title" in data! ? data.title : data?.name!}
            src={data?.backdrop_path!}
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
              <TMDBImages
                type={{ type: "poster", size: "w342" }}
                alt={"title" in data! ? data.title : data?.name!}
                src={data?.poster_path!}
                width={342}
                height={513}
                priority
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-8 sm:basis-4/6 lg:basis-3/4">
            <div>
              <h1 className="m-0 flex flex-wrap items-center justify-start gap-6">
                {"title" in data! ? data.title : data?.name} ({year})
                <div
                  className={[
                    `${
                      data?.vote_average! > 7.5
                        ? "voteGood"
                        : data?.vote_average! > 6.0
                          ? "voteOk"
                          : "voteBad"
                    }`,
                    "radial-progress",

                    "bg-neutral",
                    "border-2",
                    "border-slate-100",
                    "text-sm",
                  ].join(" ")}
                  style={style}
                  role="progressbar"
                  aria-label="Movie Rating"
                >
                  {data?.vote_average.toFixed(1)}
                </div>
              </h1>
              <small>
                {"title" in data! ? data.original_title : data?.original_name}
              </small>
            </div>
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
