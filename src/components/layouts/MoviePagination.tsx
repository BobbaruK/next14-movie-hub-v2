import { MainTitleResponse } from "@/types/MainTitleResponse";
import { Review } from "@/types/movies/Reviews";
import { Movie } from "@/types/movies/movie/MoviesResponse";
import { TVShow } from "@/types/movies/tv/TVShowsResponse";
import { People } from "@/types/people/PeoplesResponse";
import moviesFetchConfig from "@/utils/moviesFetchConfig";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";

interface Props {
  page: number;
  with_genres: string;
  sort_by: string;
  with_original_language: string;
  movie:
    | MainTitleResponse<Movie>
    | MainTitleResponse<TVShow>
    | MainTitleResponse<People>
    | MainTitleResponse<Review>;
}

const MoviePagination = ({
  page,
  with_genres,
  sort_by,
  with_original_language,
  movie,
}: Props) => {
  const moviesConfig = moviesFetchConfig(
    page,
    with_genres,
    sort_by,
    with_original_language,
  );

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-between gap-4">
      <Button
        disabled={moviesConfig.params.page <= 1 || isPending}
        onClick={() =>
          startTransition(() =>
            router.push(
              `?page=${moviesConfig.params.page - 1}${
                with_genres ? "&with_genres=" + with_genres : ""
              }${
                with_original_language
                  ? "&with_original_language=" + with_original_language
                  : ""
              }${sort_by ? "&sort_by=" + sort_by : ""}`,
            ),
          )
        }
      >
        Prev
      </Button>
      {isPending ? (
        <small> Loading...</small>
      ) : (
        <>
          {movie?.page} of {movie?.total_pages} / {movie?.total_results} results
        </>
      )}
      <Button
        disabled={moviesConfig.params.page >= movie?.total_pages! || isPending}
        onClick={() => {
          startTransition(() =>
            router.push(
              `?page=${Number(moviesConfig.params.page) + 1}${
                with_genres ? "&with_genres=" + with_genres : ""
              }${
                with_original_language
                  ? "&with_original_language=" + with_original_language
                  : ""
              }${sort_by ? "&sort_by=" + sort_by : ""}`,
            ),
          );
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default MoviePagination;
