"use client";

import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CustomAlert from "../CustomAlert";
import TMDBImages from "../TMDBImages";
import { Badge } from "../ui/badge";
import { Collection } from "@/types/Collection";

interface Props {
  queryKey: string;
}

const MainTitleHeroSection = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<
    MovieResponse | TVShowResponse | Collection
  >({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant={"default"}
        title={"Hero section"}
        description="Loading... Please be patient"
        className="container"
      />
    );

  if (!data) return null;

  return (
    <div className="relative py-20">
      <div className="absolute inset-0 z-0 h-full w-full">
        <div className="absolute inset-0 -z-20  h-full w-full">
          <TMDBImages
            type="backdrop"
            alt={"title" in data ? data.title : data.name}
            src={data.backdrop_path}
            priority
            className="h-full w-full"
            sizes={`
              (max-width: 450px) 300px,
              (max-width: 780px) 780px,
              (max-width: 1280px) 1280px,
              1400px
            `}
          />
        </div>
        <div className="absolute inset-0 -z-10  h-full w-full bg-primary bg-gradient-to-r from-primary to-secondary opacity-90"></div>
      </div>
      <div className="relative z-0">
        <div className="container flex flex-col gap-8 text-primary-foreground md:flex-row">
          <div className="flex items-center justify-center sm:basis-2/6 lg:basis-1/4">
            <TMDBImages
              type="poster"
              alt={"title" in data ? data.title : data.name}
              src={data.poster_path}
              className="h-full max-h-[513px] w-full overflow-hidden rounded-md"
              priority
              style={{
                width: "clamp(15.625rem, 13.9213rem + 8.5185vw, 21.375rem)",
                height: "clamp(23.4375rem, 20.8819rem + 12.7778vw, 32.0625rem)",
              }}
              sizes={`
                (max-width: 320px) 250px,
                (max-width: 639px) 277px,
                (max-width: 767px) 288px,
                (max-width: 1023px) 310px,
                (max-width: 1279px) 332px,
                342px
              `}
            />
          </div>
          <div className="flex flex-col justify-center gap-8 sm:basis-4/6 lg:basis-3/4">
            <div>
              <h1 className="m-0 flex flex-wrap items-center justify-start gap-6">
                {"title" in data ? data.title : data.name}

                {("release_date" in data || "first_air_date" in data) && (
                  <>
                    (
                    {"release_date" in data &&
                      ReleaseDateUI(data.release_date).year}
                    {"first_air_date" in data &&
                      ReleaseDateUI(data.first_air_date).year}
                    )
                  </>
                )}
                {"vote_average" in data && (
                  <Badge
                    variant={
                      data.vote_average > 7.5
                        ? "default"
                        : data.vote_average > 6.0
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {data?.vote_average.toFixed(1)}
                  </Badge>
                )}
              </h1>
              {("original_title" in data || "original_name" in data) && (
                <small>
                  {"original_title" in data && data.original_title}
                  {"original_name" in data && data.original_name}
                </small>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              {("release_date" in data || "first_air_date" in data) && (
                <div className="">
                  {"release_date" in data && data.release_date}
                  {"first_air_date" in data && data.first_air_date}
                </div>
              )}
              {"genres" in data && (
                <>
                  &bull;
                  <div className="">
                    {data?.genres.map((genre, index) => (
                      <React.Fragment key={genre.id}>
                        <span>{genre.name}</span>
                        {data.genres.length === index + 1 ? "" : ","}&nbsp;
                      </React.Fragment>
                    ))}
                  </div>
                </>
              )}
              {("runtime" in data ||
                ("episode_run_time" in data &&
                  data.episode_run_time.length > 0)) && (
                <>
                  &bull;
                  <div className="">
                    {"runtime" in data && data.runtime + " minutes"}
                    {"episode_run_time" in data &&
                      data.episode_run_time.length > 0 &&
                      `${data?.episode_run_time[0]} minutes`}
                  </div>
                </>
              )}
            </div>
            {"tagline" in data && (
              <p>
                <em>{data.tagline}</em>
              </p>
            )}
            {data.overview && <p>{data.overview}</p>}
            {"parts" in data && (
              <p>
                <strong>Number of Movies:</strong> {data.parts.length}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTitleHeroSection;
