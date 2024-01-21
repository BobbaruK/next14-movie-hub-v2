"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import useGetVideos from "@/hooks/useGetVideos";
import MyAPIClient from "@/services/myApiClient";
import { VideosResponse } from "@/types/VideoResponse";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";

interface Props {
  queryKey: string;
  endpoint: string;
  titleType: "movie" | "tv";
}

const VideosFiltering = ({ queryKey, endpoint, titleType }: Props) => {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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
      href: "trailers",
      count: trailers.length,
    },
    {
      label: "Teasers",
      key: "teaser",
      href: "teasers",
      count: teasers.length,
    },
    {
      label: "Clips",
      key: "clip",
      href: "clips",
      count: clips.length,
    },
    {
      label: "Behind the Scenes",
      key: "behind-the-scenes",
      href: "behind-the-scenes",
      count: bts.length,
    },
    {
      label: "Bloopers",
      key: "blooper",
      href: "bloopers",
      count: bloopers.length,
    },
    {
      label: "Featurettes",
      key: "featurette",
      href: "featurettes",
      count: featurettes.length,
    },
  ];

  return (
    <div>
      <h2 className="m-0 flex items-center justify-start gap-4 bg-primary px-2 py-4 text-primary-content">
        Videos {isPending && <LoadingSpinner size="lg" />}
      </h2>
      <ul className="flex flex-col gap-1 py-2">
        {videoTypes.map((type, index) => (
          <li
            key={index}
            className="flex cursor-pointer items-center justify-between p-2 hover:bg-slate-600"
            onClick={() =>
              startTransition(() =>
                router.push(`/${titleType}/${id}/videos/${type.href}`),
              )
            }
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
          </li>
        ))}
        {titleType === "tv" && (
          <li
            className="flex cursor-pointer items-center justify-between p-2 hover:bg-slate-600"
            onClick={() =>
              startTransition(() =>
                router.push(`/${titleType}/${id}/videos/opening-credits`),
              )
            }
            role="link"
          >
            Opening Credits
            <div
              className={[
                "badge",
                "badge-secondary",
                "text-secondary-content",
                "gap-2",
                "p-3",
              ].join(" ")}
            >
              {openingCredits.length}
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default VideosFiltering;
