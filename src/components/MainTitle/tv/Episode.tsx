"use client";

import ImageTMDB from "@/components/ImageTMDB";
import Rating from "@/components/Rating";
import { RQ_CONFIG_ENDPOINT, RQ_CONFIG_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Image_Configuration } from "@/types/TMDB_API_Configuration";
import { ProfileSizes, StillSizes } from "@/types/imageSizes";
import { EpisodeResponse } from "@/types/movies/tv/EpisodeResponse";
import idTitleHyphen from "@/utils/idTitleHyphen";
import imageLink from "@/utils/imageLink";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Episode = ({ queryKey, endpoint }: Props) => {
  const { id, seasonNumber } = useParams<{
    id: string;
    seasonNumber: string;
  }>();

  const apiClient = new MyAPIClient<EpisodeResponse>(endpoint);

  const { data, error, isLoading } = useQuery<EpisodeResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  const apiClientConfig = new MyAPIClient<Image_Configuration>(
    RQ_CONFIG_ENDPOINT,
  );
  const { data: config } = useQuery<Image_Configuration>({
    queryKey: [RQ_CONFIG_KEY],
    queryFn: () => apiClientConfig.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <div className="appContaier">
        <div className="alert alert-warning">
          Loading tv show&apos;s episode...
        </div>
      </div>
    );

  return (
    <div className="appContaier flex flex-col gap-8">
      <p>
        <Link href={`/tv/${id}/seasons/${seasonNumber}`}>
          Season {seasonNumber}
        </Link>{" "}
        Episode {data?.episode_number}
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex items-center sm:basis-[300px]  sm:justify-center">
          <div className="overflow-hidden rounded-md">
            <ImageTMDB
              type="poster"
              alt={data?.name!}
              src={imageLink<StillSizes>(
                config?.images.secure_base_url!,
                "w300",
                data?.still_path!,
              )}
              width={300}
              height={169}
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-4 py-4  sm:basis-[100%]">
          <div>
            <h2 className="m-0">{data?.name}</h2>
            <p className="flex gap-3">
              <Rating vote={data?.vote_average!} />
              <span>{ReleaseDateUI(data?.air_date).releaseDate}</span>
              &bull;
              <span>{data?.runtime}m</span>
            </p>
          </div>
        </div>
      </div>
      <p>{data?.overview}</p>

      <div className="flex flex-col md:flex-row">
        <div className="md:basis-2/4">
          <h3 className="flex flex-row flex-wrap items-center gap-4">
            Guest stars{" "}
            <div
              className={[
                "badge",
                "badge-sm",
                "badge-primary",
                "text-primary-content",
                "gap-2",
                "p-2",
              ].join(" ")}
            >
              {data?.guest_stars.length}
            </div>
          </h3>
          <div className="flex flex-col flex-wrap gap-8">
            {data?.guest_stars.map((star) => (
              <div key={star.id} className="flex flex-row gap-4">
                <div className="overflow-hidden rounded-md">
                  <Link href={`/person/${idTitleHyphen(star.id, star.name)}`}>
                    <ImageTMDB
                      type="poster"
                      alt={star.name}
                      src={imageLink<ProfileSizes>(
                        config?.images.secure_base_url!,
                        "w45",
                        star.profile_path,
                      )}
                      width={45}
                      height={68}
                    />
                  </Link>
                </div>
                <div className="flex flex-col items-start justify-center gap-1">
                  <h4>
                    <Link href={`/person/${idTitleHyphen(star.id, star.name)}`}>
                      {star.name}
                    </Link>
                  </h4>
                  <div>{star.character}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:basis-2/4">
          <h3 className="flex flex-row flex-wrap items-center gap-4">
            Crew{" "}
            <div
              className={[
                "badge",
                "badge-sm",
                "badge-primary",
                "text-primary-content",
                "gap-2",
                "p-2",
              ].join(" ")}
            >
              {data?.crew.length}
            </div>
          </h3>
          <div className="flex flex-col flex-wrap gap-8">
            {data?.crew.map((star) => (
              <div key={star.id} className="flex flex-row gap-4">
                <div className="overflow-hidden rounded-md">
                  <Link href={`/person/${star.id}`}>
                    <ImageTMDB
                      type="poster"
                      alt={star.name}
                      src={imageLink<ProfileSizes>(
                        config?.images.secure_base_url!,
                        "w45",
                        star.profile_path,
                      )}
                      width={45}
                      height={68}
                    />
                  </Link>
                </div>
                <div className="flex flex-col items-start justify-center gap-1">
                  <h4>
                    <Link href={`/person/${star.id}`}>{star.name}</Link>
                  </h4>
                  <div>{star.department}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episode;
