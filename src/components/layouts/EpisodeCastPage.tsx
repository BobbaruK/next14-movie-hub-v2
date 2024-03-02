"use client";

import TMDBImages from "@/components/TMDBImages";
import { Badge } from "@/components/ui/badge";
import { RQ_TVSHOW_EPISODE_CAST_KEY } from "@/constants";
import { EpisodeCast } from "@/types/movies/tv/EpisodeCast";
import idTitleHyphen from "@/utils/idTitleHyphen";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

const EpisodeCastPage = () => {
  const { id, seasonNumber, episodeNumber } = useParams<{
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  }>();

  const { data, error, isLoading } = useQuery<EpisodeCast>({
    queryKey: [RQ_TVSHOW_EPISODE_CAST_KEY(id, seasonNumber, episodeNumber)],
  });

  return (
    <div className="container flex flex-col gap-16">
      <div>
        <h2 className="flex items-center gap-4">
          Season Regulars <Badge>{data?.cast.length}</Badge>
        </h2>
        <div className="grid auto-cols-auto gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data?.cast.map((star) => (
            <div key={star.id} className="flex flex-row gap-4">
              <Link href={`/person/${idTitleHyphen(star.id, star.name)}`}>
                <TMDBImages
                  type="profile"
                  alt={star.name}
                  src={star.profile_path}
                  sizes="80px"
                  className="h-32 w-20 rounded-lg"
                />
              </Link>
              <div className="flex flex-col items-start justify-center gap-1">
                <h3>
                  <Link href={`/person/${idTitleHyphen(star.id, star.name)}`}>
                    {star.name}
                  </Link>
                </h3>
                <div>{star.character}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="flex items-center gap-4">
          Guest Stars <Badge>{data?.guest_stars.length}</Badge>
        </h2>
        <div className="grid auto-cols-auto gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data?.guest_stars.map((star) => (
            <div key={star.id} className="flex flex-row gap-4">
              <Link href={`/person/${idTitleHyphen(star.id, star.name)}`}>
                <TMDBImages
                  type="profile"
                  alt={star.name}
                  src={star.profile_path}
                  sizes="80px"
                  className="h-32 w-20 rounded-lg"
                />
              </Link>
              <div className="flex flex-col items-start justify-center gap-1">
                <h3>
                  <Link href={`/person/${idTitleHyphen(star.id, star.name)}`}>
                    {star.name}
                  </Link>
                </h3>
                <div>{star.character}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="flex items-center gap-4">
          Crew <Badge>{data?.crew.length}</Badge>
        </h2>
        <div className="grid auto-cols-auto gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data?.crew.map((star) => (
            <div key={star.id} className="flex flex-row gap-4">
              <Link href={`/person/${idTitleHyphen(star.id, star.name)}`}>
                <TMDBImages
                  type="profile"
                  alt={star.name}
                  src={star.profile_path}
                  sizes="80px"
                  className="h-32 w-20 rounded-lg"
                />
              </Link>
              <div className="flex flex-col items-start justify-center gap-1">
                <h3>
                  <Link href={`/person/${idTitleHyphen(star.id, star.name)}`}>
                    {star.name}
                  </Link>
                </h3>
                <div>{star.job}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EpisodeCastPage;
