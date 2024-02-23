"use client";

import CustomAlert from "@/components/CustomAlert";
import { badgeVariants } from "@/components/ui/badge";
import { GenreResponse } from "@/types/movies/GenreResponse";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

interface Props {
  queryKey: string;
}

const ByGenre = ({ queryKey }: Props) => {
  const [isPending, startTransition] = useTransition();

  const { data, error, isLoading } = useQuery<GenreResponse>({
    queryKey: [queryKey],
  });

  const searchParams = useSearchParams();
  const genreParams = searchParams.get("with_genres");
  const pageParams = searchParams.get("page");

  const genresArr = genreParams?.split(",") || [];

  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!params.has("page") || pageParams !== "1") params.set("page", "1");
      params.set(name, value);

      return params.toString();
    },
    [searchParams, pageParams],
  );

  const deleteQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!params.has("page") || pageParams !== "1") params.set("page", "1");
      params.delete(name);

      return params.toString();
    },
    [searchParams, pageParams],
  );

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
      <div className="mb-4 flex items-center gap-4">
        Filter by genre(s)
        {isPending && <small> Loading...</small>}
      </div>
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

                  if (genresArr.length === 0) {
                    router.push("?" + deleteQueryString("with_genres"));
                    return;
                  }

                  router.push(
                    "?" + createQueryString("with_genres", genresArr.join(",")),
                  );

                  return;
                }

                genresArr?.push(String(genre.id));

                router.push(
                  "?" + createQueryString("with_genres", genresArr.join(",")),
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
