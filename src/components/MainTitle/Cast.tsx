"use client";

import MyAPIClient from "@/services/myApiClient";
import { CastAndCrew } from "@/types/movies/CastAndCrew";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import MainTitlePersonCard from "./PersonCard";
import { useParams } from "next/navigation";
import Link from "next/link";

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
    placeholderData: keepPreviousData,
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <div className="alert alert-info">
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
          <MainTitlePersonCard cast={cast} key={cast.id} />
        ))}
      </div>
      <div className="py-4">
        <Link href={`/${type}/${id}/cast`}>View full cast & crew</Link>
      </div>
    </div>
  );
};

export default MainTitleCast;
