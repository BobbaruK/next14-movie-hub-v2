"use client";

import CustomAlert from "@/components/CustomAlert";
import Rating from "@/components/Rating";
import TMDBImages from "@/components/TMDBImages";
import { cn } from "@/lib/utils";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Props {
  queryKey: string;
}

const Seasons = ({ queryKey }: Props) => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useQuery<TVShowResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Seasons"}
        description="Loading... Please be patient"
        className="container"
      />
    );

  const seasons = data?.seasons;

  return (
    <div className="flex flex-col gap-8">
      {seasons?.map((season) => (
        <div key={season.id} className="border-b-[1px] border-primary pb-8">
          <div className="container flex flex-col gap-4 sm:flex-row">
            <div className="flex items-center justify-start sm:basis-[154px]">
              {/* <div className="inline-block overflow-hidden rounded-md [&>img]:object-cover"> */}
              <Link
                href={`/tv/${id}/seasons/${season.season_number}`}
                className="w-full"
              >
                <TMDBImages
                  type="poster"
                  alt={season.name}
                  src={season.poster_path}
                  className={cn(
                    `h-seasonPosterImageHeight w-full overflow-hidden rounded-md 
                    sm:h-seasonPosterImageHeight-sm `,
                  )}
                  sizes={`
                    (max-width: 320px) 300px,
                    (max-width: 639px) 586px,
                    154px
                  `}
                />
              </Link>
              {/* </div> */}
            </div>
            <div className="flex flex-col justify-center gap-4 py-4 sm:grow">
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
