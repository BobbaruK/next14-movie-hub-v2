"use client";

import { RQ_COUNTRIES_ENDPOINT, RQ_COUNTRIES_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Country } from "@/types/Country";
import { AltTitle } from "@/types/movies/AlternativeTitle";
import { MovieAlternativeTitles } from "@/types/movies/movie/MovieAlternativeTitles";
import { TVShowAlternativeTitles } from "@/types/movies/tv/TVShowAlternativeTitles";
import { useQuery } from "@tanstack/react-query";
import AlternativeTitleCard from "../Cards/AlternativeTitle";

interface Props {
  queryKey: string;
  endpoint: string;
}

const AlternativeTitles = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<
    MovieAlternativeTitles | TVShowAlternativeTitles
  >(endpoint);
  const { data, error, isLoading } = useQuery<
    MovieAlternativeTitles | TVShowAlternativeTitles
  >({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
  });

  const apiClientCountries = new MyAPIClient<Country[]>(RQ_COUNTRIES_ENDPOINT);
  const {
    data: countries,
    error: errorCountries,
    isLoading: isLoadingCountries,
  } = useQuery<Country[]>({
    queryKey: [RQ_COUNTRIES_KEY],
    queryFn: () => apiClientCountries.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);
  if (errorCountries)
    throw new Error(`${queryKey} - ${errorCountries.message}`);

  if (isLoading || isLoadingCountries)
    return (
      <div className="alert alert-warning">Loading alternative titles...</div>
    );

  const titles =
    "titles" in data! ? data.titles : "results" in data! ? data.results : [];

  if (titles.length === 0)
    return <div className="alert alert-warning">No results</div>;

  const groupedKeys = titles.reduce(
    (group: { [key: string]: AltTitle[] }, item) => {
      if (!group[item.iso_3166_1]) {
        group[item.iso_3166_1] = [];
      }
      group[item.iso_3166_1].push(item);
      return group;
    },
    {},
  );

  const resultArray = Object.values(groupedKeys);

  return (
    <div className="flex flex-col gap-8">
      {resultArray
        .sort((a, b) => {
          if (
            a.find((target) => target.iso_3166_1)?.iso_3166_1! <
            b.find((target) => target.iso_3166_1)?.iso_3166_1!
          ) {
            return -1;
          }
          if (
            a.find((target) => target.iso_3166_1)?.iso_3166_1! >
            b.find((target) => target.iso_3166_1)?.iso_3166_1!
          ) {
            return 1;
          }
          return 0;
        })
        .map((titles, ind) => (
          <AlternativeTitleCard titles={titles} key={ind} countries={countries!} />
        ))}
    </div>
  );
};

export default AlternativeTitles;
