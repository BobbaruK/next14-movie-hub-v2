"use client";

import CustomAlert from "@/components/CustomAlert";
import Spinner from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import useGetVideos from "@/hooks/useGetVideos";
import { VideosResponse } from "@/types/VideoResponse";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

interface Props {
  queryKey: string;
  titleType: "movie" | "tv";
}

const VideosFiltering = ({ queryKey, titleType }: Props) => {
  const { id } = useParams<{ id: string }>();

  const pathname = usePathname();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { data, error, isLoading } = useQuery<VideosResponse>({
    queryKey: [queryKey],
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
    return (
      <CustomAlert
        variant="default"
        title={"Videos sidebar"}
        description="Loading... Please be patient"
      />
    );

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
    {
      label: "Opening Credits",
      key: "opening-credits",
      href: "opening-credits",
      count: openingCredits.length,
    },
  ];

  return (
    <Card className="overflow-hidden">
      <h2 className="m-0 flex items-center justify-start gap-4 bg-primary px-2 py-4 text-primary-foreground">
        Videos
        {isPending && <Spinner />}
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

            if (index === videoTypes.length - 1 && titleType === "movie")
              return null;

            return (
              <li
                key={index}
                className={` cursor-pointer  ${isActive ? "text-accent-content bg-primary-foreground text-primary" : "hover:bg-secondary hover:text-secondary-foreground"}`}
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

                  <Badge variant="default">{type.count}</Badge>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default VideosFiltering;
