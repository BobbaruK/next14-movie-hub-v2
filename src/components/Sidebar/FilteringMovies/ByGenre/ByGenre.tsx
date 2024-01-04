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
  const genreParams = params.get("with_genres");
  const langParams = params.get("with_original_language");
  const sortByParams = params.get("sort_by");

  const genresArr = genreParams?.split(",") || [];

  const router = useRouter();

  if (error) return <div className="alert alert-error">{error.message}</div>;

  if (isLoading)
    return <div className="alert alert-info">Loading genres...</div>;

  return (
    <div className="mb-6">
      <h3>ByGenre</h3>
      <div className="flex flex-wrap gap-2">
        {data?.genres.map((genre) => (
          <button
            className={[
              "badge",
              `${
                genresArr?.includes(String(genre.id))
                  ? "badge-accent"
                  : "badge-primary"
              }`,
            ].join(" ")}
            key={genre.id}
            onClick={() => {
              if (genresArr?.includes(String(genre.id))) {
                const ind = genresArr.indexOf(String(genre.id));
                genresArr.splice(ind, 1);

                router.push(
                  `?page=1${
                    genresArr.length
                      ? "&with_genres=" + genresArr.join(",")
                      : ""
                  }${
                    langParams ? "&with_original_language=" + langParams : ""
                  }${sortByParams ? "&sort_by=" + sortByParams : ""}`,
                );

                return;
              }

              genresArr?.push(String(genre.id));

              router.push(
                `?page=1&with_genres=${genresArr}${
                  langParams ? "&with_original_language=" + langParams : ""
                }${sortByParams ? "&sort_by=" + sortByParams : ""}`,
              );
            }}
          >
            {genre.id} - {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ByGenre;
