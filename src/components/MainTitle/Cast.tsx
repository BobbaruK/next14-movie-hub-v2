"use client";

import MyAPIClient from "@/services/myApiClient";
import { CastAndCrew, TheCast } from "@/types/movies/CastAndCrew";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import TMDBImages from "../TMDBImages";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import idTitleHyphen from "@/utils/idTitleHyphen";

const PersonCard = ({ cast }: { cast: TheCast }) => {
  return (
    <>
      <Card className="overflow-hidden">
        <Link
          href={`/person/${idTitleHyphen(cast.id, cast.name)}`}
          className="w-full"
        >
          <TMDBImages
            type={{ type: "profile", size: "w185" }}
            alt={cast.name}
            src={cast.profile_path}
            width={185}
            height={278}
          />
        </Link>
        <CardHeader>
          <CardTitle>
            <Link href={`/person/${idTitleHyphen(cast.id, cast.name)}`} className="w-full">
              {cast.name}
            </Link>
          </CardTitle>
          <CardDescription>{cast.character}</CardDescription>
        </CardHeader>
      </Card>
    </>
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
