import { RQ_CONFIG_KEY } from "@/constants";
import { TMDB_API_Configuration } from "@/types/TMDB_API_Configuration";
import { PosterSizes } from "@/types/imageSizes";
import { Movie } from "@/types/movies/movie/MoviesResponse";
import { TVShow } from "@/types/movies/tv/TVShowsResponse";
import imageLink from "@/utils/imageLink";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ImageTMDB from "./ImageTMDB";

interface Props {
  movie: Movie | TVShow;
  index: number;
}

const MovieCard = ({ movie, index }: Props) => {
  const style = {
    "--value": movie.vote_average * 10,
    "--thickness": "3px",
    "--size": "2rem",
  } as React.CSSProperties;

  const { data: config } = useQuery<TMDB_API_Configuration>({
    queryKey: [RQ_CONFIG_KEY],
  });

  const title = "title" in movie ? movie.title : movie.name;

  const { releaseDate } = ReleaseDateUI(
    "release_date" in movie ? movie.release_date : movie.first_air_date,
  );

  const link = "title" in movie ? `/movie/${movie.id}` : `/tv/${movie.id}`;

  return (
    <div className="card bg-base-100 shadow-md shadow-primary">
      <figure>
        <Link href={link} className="w-full">
          {/* <img
            className="max-w-full object-cover sm:h-72"
            src={imageLink<PosterSizes>(
              config?.images.secure_base_url!,
              "w342",
              movie?.poster_path!,
            )}
            alt={title}
            width={342}
            height={513}
            // loading={index < 4 ? "eager" : "lazy"}
            loading="lazy"
          /> */}
          <ImageTMDB
            type="poster"
            alt={title}
            src={imageLink<PosterSizes>(
              config?.images.secure_base_url!,
              "w342",
              movie?.poster_path!,
            )}
            width={342}
            height={513}
            priority={index < 4 ? true : false}
          />
        </Link>
      </figure>
      <div className="card-body relative flex justify-between p-4 pt-7">
        <div
          className={[
            `${
              movie.vote_average > 7.5
                ? "voteGood"
                : movie.vote_average > 6.0
                  ? "voteOk"
                  : "voteBad"
            }`,
            "radial-progress",

            "absolute",
            "-top-5",

            "bg-slate-900",
            "border-2",
            "border-slate-100",
            "text-sm",
          ].join(" ")}
          style={style}
          role="progressbar"
        >
          {movie.vote_average.toFixed(1)}
        </div>
        <h2 className="card-title m-0 line-clamp-2" title={title}>
          <Link href={link}>{title}</Link>
        </h2>
        <p className="grow-0">{releaseDate}</p>
      </div>
    </div>
  );
};

export default MovieCard;
