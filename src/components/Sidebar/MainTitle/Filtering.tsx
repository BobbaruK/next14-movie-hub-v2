"use client";

import { RQ_COUNTRIES_ENDPOINT, RQ_COUNTRIES_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Country } from "@/types/Country";
import { MovieAlternativeTitles } from "@/types/movies/movie/MovieAlternativeTitles";
import { TVShowAlternativeTitles } from "@/types/movies/tv/TVShowAlternativeTitles";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  title: string;
  queryKey: string;
  endpoint: string;
}

const MainTitleFiltering = ({ title, queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<
    MovieAlternativeTitles | TVShowAlternativeTitles
  >(endpoint);
  const { data, error, isLoading } = useQuery<
    MovieAlternativeTitles | TVShowAlternativeTitles
  >({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
    placeholderData: keepPreviousData,
  });

  const apiClientCountries = new MyAPIClient<Country[]>(RQ_COUNTRIES_ENDPOINT);
  const {
    data: countries,
    error: errorCountries,
    isLoading: isLoadingCountries,
  } = useQuery<Country[]>({
    queryKey: [RQ_COUNTRIES_KEY],
    queryFn: () => apiClientCountries.getAll(),
    placeholderData: keepPreviousData,
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);
  if (errorCountries)
    throw new Error(`${queryKey} - ${errorCountries.message}`);

  if (isLoading || isLoadingCountries)
    return (
      <div className="alert alert-info">Loading alternative titles sidebar...</div>
    );

  const titles =
    "titles" in data! ? data.titles : "results" in data! ? data.results : [];

  const titlesCountries: string[] = [];

  titles.forEach((title) => {
    if (titlesCountries.includes(title.iso_3166_1)) return;
    titlesCountries.push(title.iso_3166_1);
  });

  return (
    <>
      <h2 className="m-0 flex items-center justify-between bg-primary px-2 py-4 text-primary-content">
        {title}
        <div
          className={[
            "badge",
            "badge-primary-content",
            "text-primary",
            "gap-2",
            "p-3",
          ].join(" ")}
        >
          {titles.length}
        </div>
      </h2>
      <ul className="flex flex-col gap-1 py-2">
        {titlesCountries
          ?.sort((a, b) => {
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            return 0;
          })
          .map((country, index) => (
            <li key={index} className="p-2 hover:bg-slate-600">
              <Link
                href={`#${country}`}
                className={[
                  "flex",
                  "items-center",
                  "justify-between",
                  "w-full",
                ].join(" ")}
              >
                {
                  countries?.find((cntry) => cntry.iso_3166_1 === country)
                    ?.english_name
                }
                <div
                  className={[
                    "badge",
                    "badge-secondary",
                    "text-secondary-content",
                    "gap-2",
                    "p-3",
                  ].join(" ")}
                >
                  {/* {renderedImages.filter((imgs) => imgs.iso_639_1 === lang).length} */}
                  {
                    titles.filter((title) => title.iso_3166_1 === country)
                      .length
                  }
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default MainTitleFiltering;
