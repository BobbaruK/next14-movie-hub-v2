"use client";

import { IsoLang } from "@/components/IsoLang";
import MyAPIClient from "@/services/myApiClient";
import { ReleaseDatesResponse } from "@/types/movies/movie/ReleaseDates";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  title: string;
  queryKey: string;
  endpoint: string;
}

const ReleasesFiltering = ({ title, queryKey, endpoint }: Props) => {
  const apiClientReleases = new MyAPIClient<ReleaseDatesResponse>(endpoint);
  const { data, error, isLoading } = useQuery<ReleaseDatesResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientReleases.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-warning">Loading sidebar...</div>;

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
          {data?.results.length}
        </div>
      </h2>
      <ul className="flex flex-col gap-1 py-2">
        {data?.results
          .sort((a, b) => {
            if (a.iso_3166_1 < b.iso_3166_1) {
              return -1;
            }
            if (a.iso_3166_1 > b.iso_3166_1) {
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
                href={`#${translation.iso_3166_1}`}
                className={[
                  "flex",
                  "items-center",
                  "justify-between",
                  "w-full",
                ].join(" ")}
              >
                <IsoLang iso={translation.iso_3166_1} />
                <div
                  className={[
                    "badge",
                    "badge-secondary",
                    "text-secondary-content",
                    "gap-2",
                    "p-3",
                  ].join(" ")}
                >
                  {translation.release_dates.length}
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default ReleasesFiltering;
