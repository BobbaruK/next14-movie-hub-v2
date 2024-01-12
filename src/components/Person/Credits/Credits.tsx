"use client";

import MyAPIClient from "@/services/myApiClient";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import Acting from "./Acting";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Credits = ({ endpoint, queryKey }: Props) => {
  const apiClient = new MyAPIClient<CombinedCredits>(endpoint);
  const { data, error, isLoading } = useQuery<CombinedCredits>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
    placeholderData: keepPreviousData,
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading credits...</div>;

  const moviesCast = data?.cast.filter(
    (cast) => cast.media_type === "movie",
  ) as CombinedCreditsMovieCast[];

  const movies = moviesCast.reduce(
    (group: { [key: string]: CombinedCreditsMovieCast[] }, item) => {
      if (!group[item.title]) {
        group[item.title] = [];
      }
      group[item.title].push(item);
      return group;
    },
    {},
  );
  const moviesArray = Object.values(movies);

  const tvsCast = data?.cast.filter(
    (cast) => cast.media_type === "tv",
  ) as CombinedCreditsTVCast[];

  const tvs = tvsCast.reduce(
    (group: { [key: string]: CombinedCreditsTVCast[] }, item) => {
      if (!group[item.name]) {
        group[item.name] = [];
      }
      group[item.name].push(item);
      return group;
    },
    {},
  );

  const tvsArray = Object.values(tvs);

  const castCreditsArray = [...moviesArray, ...tvsArray];

  for (let i = 0; i < castCreditsArray.length; i++) {
    for (let j = 0; j < castCreditsArray[i].length; j++) {
      const t = castCreditsArray[i][j];
      castCreditsArray[i][j].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }
  }

  const groupByYear = castCreditsArray.reduce(
    (
      group: {
        [key: string]: (CombinedCreditsMovieCast[] | CombinedCreditsTVCast[])[];
      },
      item,
    ) => {
      if (!group[item[0].year]) {
        group[item[0].year] = [];
      }
      group[item[0].year].push(item);
      return group;
    },
    {},
  );

  const groupByYearArray = Object.values(groupByYear);

  return (
    <div className="flex flex-col gap-8 py-10">
      <div>
        <h2>Acting</h2>
        <Acting castArr={groupByYearArray} />
      </div>
    </div>
  );
};

export default Credits;
