"use client";

import { Card, CardContent } from "@/components/ui/card";
import useGetVideos from "@/hooks/useGetVideos";
import MyAPIClient from "@/services/myApiClient";
import { VideosResponse } from "@/types/VideoResponse";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

interface Props {
  queryKey: string;
  endpoint: string;
  titleType: "movie" | "tv";
}

const VideosFiltering = ({ queryKey, endpoint, titleType }: Props) => {
  const { id } = useParams<{ id: string }>();

  const pathname = usePathname();

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
    <Card className="overflow-hidden">
      <h2 className="text-primary-content m-0 flex items-center justify-start gap-4 bg-primary px-2 py-4">
        Videos
        {isPending && <small> Loading...</small>}
      </h2>
      <CardContent className="p-0">
        <ul className="flex flex-col gap-1 py-2">
          {videoTypes.map((type, index) => {
            const path = `/${titleType}/${id}/videos/${type.href}`;

            const isActive = pathname === path;

            const goToPath = () =>
              startTransition(() => {
                router.push(path);
              });

            return (
              <li
                key={index}
                className={` cursor-pointer  ${isActive ? "text-accent-content bg-accent" : "hover:bg-slate-600"}`}
                role="link"
                tabIndex={0}
                aria-label={type.label}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    goToPath();
                  }
                }}
                onClick={goToPath}
              >
                <div
                  role="presentation"
                  className="flex items-center justify-between p-2"
                >
                  {type.label}
                  <div
                    className={[
                      "badge",
                      `${isActive ? "badge-neutral text-neutral-content" : "badge-secondary text-secondary-content"}`,
                      "gap-2",
                      "p-3",
                    ].join(" ")}
                  >
                    {type.count}
                  </div>
                </div>
              </li>
            );
          })}
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
      </CardContent>
    </Card>
  );
};

export default VideosFiltering;
