"use client";

import Rating from "@/components/Rating";
import TMDBImages from "@/components/TMDBImages";
import MyAPIClient from "@/services/myApiClient";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Seasons = ({ queryKey, endpoint }: Props) => {
  const { id } = useParams<{ id: string }>();

  const apiClient = new MyAPIClient<TVShowResponse>(endpoint);
  const { data, error, isLoading } = useQuery<TVShowResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <div className="appContaier">
        <div className="alert alert-warning">Loading tv show seasons...</div>
      </div>
    );

  const seasons = data?.seasons;

  return (
    <div className="flex flex-col gap-8">
      {seasons?.map((season) => (
        <div key={season.id} className="border-b-[1px] border-primary pb-8">
          <div className="appContaier flex flex-col gap-4 lg:flex-row">
            <div className="flex items-center justify-start sm:basis-[154px]">
              <div className="inline-block overflow-hidden rounded-md [&>img]:object-cover">
                <Link href={`/tv/${id}/seasons/${season.season_number}`}>
                  <TMDBImages
                    type={{ type: "poster", size: "w154" }}
                    alt={season.name}
                    src={season.poster_path}
                    width={154}
                    height={231}
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4 py-4 sm:basis-[100%]">
              <h2 className="m-0">
                <Link href={`/tv/${id}/seasons/${season.season_number}`}>
                  {season.name}
                </Link>
              </h2>
              <p className="flex gap-3">
                <Rating vote={season.vote_average} />
                <span>{ReleaseDateUI(season.air_date).year}</span>
              </p>
              <div>{season.episode_count} Episodes</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Seasons;
