import { MoviesResponse } from "@/types/movies/movie/MoviesResponse";
import { TVShowsResponse } from "@/types/movies/tv/TVShowsResponse";
import moviesFetchConfig from "@/utils/moviesFetchConfig";
import { useRouter } from "next/navigation";

interface Props {
  page: number;
  with_genres: string;
  sort_by: string;
  with_original_language: string;
  movie: MoviesResponse | TVShowsResponse | undefined;
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

  return (
    <div className="flex items-center justify-between gap-4">
      <button
        className="btn btn-primary"
        disabled={moviesConfig.params.page <= 1}
        onClick={() =>
          router.push(
            `?page=${moviesConfig.params.page - 1}${
              sort_by ? "&sort_by=" + sort_by : ""
            }${
              with_original_language
                ? "&with_original_language=" + with_original_language
                : ""
            }`,
          )
        }
      >
        Prev
      </button>
      {movie?.page} of {movie?.total_pages} / {movie?.total_results} results
      <button
        className="btn btn-primary"
        disabled={moviesConfig.params.page >= movie?.total_pages!}
        onClick={() => {
          router.push(
            `?page=${Number(moviesConfig.params.page) + 1}${
              sort_by ? "&sort_by=" + sort_by : ""
            }${
              with_original_language
                ? "&with_original_language=" + with_original_language
                : ""
            }`,
          );
        }}
      >
        Next
      </button>
    </div>
  );
};

export default MoviePagination;
