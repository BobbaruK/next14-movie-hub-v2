"use client";

import { RQ_MOVIES_GENRES_KEY } from "@/constants";
import { GenreResponse } from "@/types/movies/GenreResponse";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

const ByGenre = () => {
  const { data, error, isLoading } = useQuery<GenreResponse>({
    queryKey: [RQ_MOVIES_GENRES_KEY],
    // queryFn: () => apiClient.getAll(),
    placeholderData: keepPreviousData,
  });

  const params = useSearchParams();

  const router = useRouter();

  if (error) return <div className="alert alert-error">{error.message}</div>;

  if (isLoading)
    return <div className="alert alert-info">Loading genres...</div>;

  return (
    <div className="mb-6">
      <h3>ByGenre</h3>
      <div className="flex flex-wrap gap-2">
        {data?.genres.map((genre) => (
          <button className="badge badge-primary" key={genre.id}>
            {genre.id} - {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ByGenre;
