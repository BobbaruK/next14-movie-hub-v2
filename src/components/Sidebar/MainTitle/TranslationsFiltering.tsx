"use client";

import MyAPIClient from "@/services/myApiClient";
import {
  TranslationsMovie,
  TranslationsTV,
} from "@/types/movies/TranslationsResponse";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  title: string;
  queryKey: string;
  endpoint: string;
}

const TranslationsFiltering = ({ title, queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<
    TranslationsMovie | TranslationsTV
  >(endpoint);
  const { data, error, isLoading } = useQuery<
    TranslationsMovie | TranslationsTV
  >({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
    placeholderData: keepPreviousData,
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading sidebar...</div>;

  // const titles =
  //   "titles" in data! ? data.titles : "results" in data! ? data.results : [];

  // const titlesCountries: string[] = [];

  // titles.forEach((title) => {
  //   if (titlesCountries.includes(title.iso_3166_1)) return;
  //   titlesCountries.push(title.iso_3166_1);
  // });

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
          {/* {titles.length} */}
          {data?.translations.length}
        </div>
      </h2>
      <ul className="flex flex-col gap-1 py-2">
        {data?.translations
          .sort((a, b) => {
            if (a.english_name < b.english_name) {
              return -1;
            }
            if (a.english_name > b.english_name) {
              return 1;
            }
            return 0;
          })
          .map((translation, index) => (
            <li
              key={translation.iso_3166_1 + index}
              className="p-2 hover:bg-slate-600"
            >
              <Link
                href={`#${translation.iso_639_1}-${translation.iso_3166_1}`}
                className={[
                  "flex",
                  "items-center",
                  "justify-between",
                  "w-full",
                ].join(" ")}
              >
                {translation.english_name}
                {/* {
                  countries?.find((cntry) => cntry.iso_3166_1 === country)
                    ?.english_name
                } */}
                <div
                  className={[
                    "badge",
                    "badge-secondary",
                    "text-secondary-content",
                    "gap-2",
                    "p-3",
                  ].join(" ")}
                >
                  {translation.iso_639_1}-{translation.iso_3166_1}
                </div>
              </Link>
            </li>
          ))}
        {/* {titlesCountries
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
                  {
                    titles.filter((title) => title.iso_3166_1 === country)
                      .length
                  }
                </div>
              </Link>
            </li>
          ))} */}
      </ul>
    </>
  );
};

export default TranslationsFiltering;
