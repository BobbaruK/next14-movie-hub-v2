"use client";

import useGetVideos from "@/hooks/useGetVideos";
import MyAPIClient from "@/services/myApiClient";
import { VideosResponse } from "@/types/VideoResponse";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  queryKey: string;
  endpoint: string;
}

const VideosFiltering = ({ queryKey, endpoint }: Props) => {
  const apiClientVideos = new MyAPIClient<VideosResponse>(endpoint);

  const { data, error, isLoading } = useQuery<VideosResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientVideos.getAll(),
  });

  const {
    trailers,
    teasers,
    clips,
    bts,
    bloopers,
    featurettes,
    openingCredits,
  } = useGetVideos(data!);

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-warning">Loading videos...</div>;

  const videoTypes = [
    {
      label: "Trailers",
      key: "trailer",
      count: trailers.length,
    },
    {
      label: "Teasers",
      key: "teaser",
      count: teasers.length,
    },
    {
      label: "Clips",
      key: "clip",
      count: clips.length,
    },
    {
      label: "Behind the Scenes",
      key: "behind-the-scenes",
      count: bts.length,
    },
    {
      label: "Bloopers",
      key: "blooper",
      count: bloopers.length,
    },
    {
      label: "Featurettes",
      key: "featurette",
      count: featurettes.length,
    },
    {
      label: "Opening Credits",
      key: "opening-credits",
      count: openingCredits.length,
    },
  ];

  return (
    <div>
      <h2 className="m-0 flex items-center justify-between bg-primary px-2 py-4 text-primary-content">
        Videos
      </h2>
      <ul className="flex flex-col gap-1 py-2">
        {videoTypes.map((type, index) => (
          <li key={index} className="p-2 hover:bg-slate-600">
            <Link
              href={`?filter=${type.key}`}
              className={[
                "flex",
                "items-center",
                "justify-between",
                "w-full",
              ].join(" ")}
            >
              {type.label}
              <div
                className={[
                  "badge",
                  "badge-secondary",
                  "text-secondary-content",
                  "gap-2",
                  "p-3",
                ].join(" ")}
              >
                {type.count}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideosFiltering;
