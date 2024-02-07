"use client";

import CustomAlert from "@/components/CustomAlert";
import { badgeVariants } from "@/components/ui/badge";
import { GenreResponse } from "@/types/movies/GenreResponse";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface Props {
  queryKey: string;
}

const ByGenre = ({ queryKey }: Props) => {
  const [isPending, startTransition] = useTransition();

  const { data, error, isLoading } = useQuery<GenreResponse>({
    queryKey: [queryKey],
  });

  const params = useSearchParams();
  const genreParams = params.get("with_genres");
  const langParams = params.get("with_original_language");
  const sortByParams = params.get("sort_by");

  const genresArr = genreParams?.split(",") || [];

  const router = useRouter();

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Filter by Genre"}
        description="Loading... Please be patient"
      />
    );

  return (
    <div className="mb-6">
      <h3 className="flex items-center gap-4">
        By Genre
        {isPending && <small> Loading...</small>}
      </h3>
      <div className="flex flex-wrap gap-2">
        {data?.genres.map((genre) => (
          <button
            className={badgeVariants({
              variant: genresArr?.includes(String(genre.id))
                ? "default"
                : "outline",
            })}
            key={genre.id}
            onClick={() => {
              startTransition(() => {
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
              });
            }}
            disabled={isPending}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ByGenre;
