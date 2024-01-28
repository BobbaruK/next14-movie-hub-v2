"use client";

import MyAPIClient from "@/services/myApiClient";
import { CastAndCrew } from "@/types/movies/CastAndCrew";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MainTitleEmblaCarousel } from "../MainTitleEmblaCarousel";
import CustomAlert from "../CustomAlert";

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
      <CustomAlert
        variant="default"
        title={"Cast"}
        description="Loading... Please be patient"
      />
    );

  const cast = [...(data?.cast || [])];
  cast.splice(9);

  return (
    <div>
      <h2>{type === "movie" ? "Top Billed Cast" : "Series Cast"}</h2>
      <MainTitleEmblaCarousel
        typeOptions={{ type: "cast", arr: cast }}
        slideSizes="auto-cols-[50%] grid-flow-col sm:auto-cols-[33.33333333333333%] md:auto-cols-[33.33%] lg:auto-cols-[25%] xl:auto-cols-[20%]"
      />
      <div className="py-4">
        <Link href={`/${type}/${id}/cast`}>View full cast & crew</Link>
      </div>
    </div>
  );
};

export default MainTitleCast;
