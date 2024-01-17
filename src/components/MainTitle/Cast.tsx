"use client";

import MyAPIClient from "@/services/myApiClient";
import { ProfileSizes } from "@/types/imageSizes";
import { CastAndCrew, TheCast } from "@/types/movies/CastAndCrew";
import idTitleHyphen from "@/utils/idTitleHyphen";
import imageLink from "@/utils/imageLink";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import ImageTMDB from "../ImageTMDB";

const PersonCard = ({ cast }: { cast: TheCast }) => {
  return (
    <div className="card overflow-hidden bg-base-100 shadow-md shadow-primary">
      <figure>
        <Link
          href={`/person/${idTitleHyphen(cast.id, cast.name)}`}
          className="w-full"
        >
          <ImageTMDB
            type="poster"
            alt={cast.name}
            src={imageLink<ProfileSizes>(
              "https://image.tmdb.org/t/p/",
              "w185",
              cast.profile_path,
            )}
            width={185}
            height={278}
          />
        </Link>
      </figure>
      <div className="card-body relative flex justify-between gap-1 p-4">
        <p>
          <Link href={`/person/${cast.id}`} className="w-full">
            {cast.name}
          </Link>
        </p>
        <p>
          <small>
            <Link href={`/person/${cast.id}`} className="w-full">
              {cast.character}
            </Link>
          </small>
        </p>
      </div>
    </div>
  );
};

interface Props {
  queryKey: string;
  endpoint: string;
  type: "movie" | "tv";
}

const MainTitleCast = ({ queryKey, endpoint, type }: Props) => {
  const { id } = useParams<{ id: string }>();

  const apiClient = new MyAPIClient<CastAndCrew>(endpoint);
  const { data, error, isLoading } = useQuery<CastAndCrew>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <div className="alert alert-warning">
        Loading main title cast and crew...
      </div>
    );

  const cast = [...(data?.cast || [])];
  cast.splice(6);

  return (
    <div>
      <div>
        <h2>{type === "movie" ? "Top Billed Cast" : "Series Cast"}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-6">
        {cast.map((cast) => (
          <PersonCard cast={cast} key={cast.id} />
        ))}
      </div>
      <div className="py-4">
        <Link href={`/${type}/${id}/cast`}>View full cast & crew</Link>
      </div>
    </div>
  );
};

export default MainTitleCast;
