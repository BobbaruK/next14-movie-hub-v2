"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export const enum SortBy {
  popularityAsc = "popularity.asc",
  popularityDesc = "popularity.desc",
  revenueAsc = "revenue.asc",
  revenueDesc = "revenue.desc",
  releaseDateAsc = "primary_release_date.asc",
  releaseDateDesc = "primary_release_date.desc",
  voteAverageAsc = "vote_average.asc",
  voteAverageDesc = "vote_average.desc",
  voteCountAsc = "vote_count.asc",
  voteCountDesc = "vote_count.desc",
}

const Sorting = () => {
  const [isPending, startTransition] = useTransition();

  const sorter = [
    {
      value: SortBy.popularityAsc,
      label: "Popularity ASC",
    },
    {
      value: SortBy.popularityDesc,
      label: "Popularity DESC",
    },
    {
      value: SortBy.revenueAsc,
      label: "Revenue ASC",
    },
    {
      value: SortBy.revenueDesc,
      label: "Revenue DESC",
    },
    {
      value: SortBy.releaseDateAsc,
      label: "Release Date ASC",
    },
    {
      value: SortBy.releaseDateDesc,
      label: "Release Date DESC",
    },
    {
      value: SortBy.voteAverageAsc,
      label: "Average Votes ASC",
    },
    {
      value: SortBy.voteAverageDesc,
      label: "Average Votes DESC",
    },
    {
      value: SortBy.voteCountAsc,
      label: "Vote Count ASC",
    },
    {
      value: SortBy.voteCountDesc,
      label: "Vote Count DESC",
    },
  ];

  const params = useSearchParams();
  const genreParams = params.get("with_genres");
  const langParams = params.get("with_original_language");

  const paramsString = (sortBy: string): string =>
    `?page=1${genreParams ? "&with_genres=" + genreParams : ""}${
      langParams ? "&with_original_language=" + langParams : ""
    }&sort_by=${sortBy}`;

  const router = useRouter();

  return (
    <>
      <h2 className="flex items-center gap-4">
        <label htmlFor="sort">Sorting</label>
        {isPending && <small> Loading...</small>}
      </h2>
      <Select
        onValueChange={(e) => {
          startTransition(() => {
            router.push(paramsString(e));
          });
        }}
        value={params.get("sort_by") || SortBy.popularityDesc}
      >
        <SelectTrigger className="w-[270px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          {sorter.map((sort) => (
            <SelectItem key={sort.value} value={sort.value}>
              {sort.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default Sorting;
