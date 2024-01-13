import { RQ_CONFIG_ENDPOINT, RQ_CONFIG_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Image_Configuration } from "@/types/TMDB_API_Configuration";
import { PosterSizes, ProfileSizes } from "@/types/imageSizes";
import { Movie } from "@/types/movies/movie/MoviesResponse";
import { TVShow } from "@/types/movies/tv/TVShowsResponse";
import imageLink from "@/utils/imageLink";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ImageTMDB from "./ImageTMDB";
import { People } from "@/types/people/PeoplesResponse";

interface Props {
  movie: Movie | TVShow | People;
  index: number;
}

const MovieCard = ({ movie, index }: Props) => {
  const apiClient = new MyAPIClient<Image_Configuration>(RQ_CONFIG_ENDPOINT);

  const {
    data: config,
    isLoading,
    error,
  } = useQuery<Image_Configuration>({
    queryKey: [RQ_CONFIG_KEY],
    queryFn: () => apiClient.getAll(),
  });

  const title = "title" in movie ? movie.title : movie.name;

  if (error) throw new Error(`${RQ_CONFIG_KEY} - ${error.message}`);

  if (isLoading)
    return (
      <div className="alert card alert-info shadow-md shadow-primary">
        Loading config...
      </div>
    );

  const movieTitle = "title" in movie && movie;
  const tv = "first_air_date" in movie && movie;
  const person = "biography" in movie && movie;

  const style = {
    "--value": (movieTitle ? movieTitle.vote_average : 0) * 10,
    "--thickness": "3px",
    "--size": "2rem",
  } as React.CSSProperties;

  const link = () => {
    if (movieTitle) return `/movie/${movieTitle.id}`;
    if (tv) return `/tv/${tv.id}`;
    if (person) return `/person/${person.id}`;
    return "";
  };

  const date = () => {
    if (movieTitle) return ReleaseDateUI(movieTitle.release_date).releaseDate;
    if (tv) return ReleaseDateUI(tv.first_air_date).releaseDate;
    if (person) return "";
    return "";
  };

  return (
    <div className="card bg-base-100 shadow-md shadow-primary">
      <figure>
        <Link href={link()} className="w-full">
          {(movieTitle || tv) && (
            <ImageTMDB
              type="poster"
              alt={title}
              src={imageLink<PosterSizes>(
                config?.images.secure_base_url!,
                "w342",
                movie.poster_path,
              )}
              width={342}
              height={513}
              priority={index < 4 ? true : false}
            />
          )}
          {person && (
            <ImageTMDB
              type="poster"
              alt={title}
              src={imageLink<ProfileSizes>(
                config?.images.secure_base_url!,
                "w185",
                movie.profile_path,
              )}
              width={342}
              height={513}
              priority={index < 4 ? true : false}
            />
          )}
        </Link>
      </figure>
      <div className="card-body relative flex justify-between p-4 pt-7">
        {(movieTitle || tv) && (
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
            aria-label="Movie Rating"
          >
            {movie.vote_average.toFixed(1)}
          </div>
        )}

        <h2 className="card-title m-0 line-clamp-2" title={title}>
          <Link href={link()}>{title}</Link>
        </h2>

        {(movieTitle || tv) && <p className="grow-0">{date()}</p>}
      </div>
    </div>
  );
};

export default MovieCard;
