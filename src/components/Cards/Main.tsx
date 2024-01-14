import { RQ_CONFIG_ENDPOINT, RQ_CONFIG_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Image_Configuration } from "@/types/TMDB_API_Configuration";
import { PosterSizes, ProfileSizes } from "@/types/imageSizes";
import { Movie } from "@/types/movies/movie/MoviesResponse";
import { TVShow } from "@/types/movies/tv/TVShowsResponse";
import { People } from "@/types/people/PeoplesResponse";
import imageLink from "@/utils/imageLink";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ImageTMDB from "../ImageTMDB";
import idTitleHyphen from "@/utils/idTitleHyphen";

interface Props {
  movie: Movie | TVShow | People;
  index: number;
}

const MainCard = ({ movie, index }: Props) => {
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

  const theMovie = "title" in movie && movie;
  const theTv = "first_air_date" in movie && movie;
  const thePerson = "known_for_department" in movie && movie;

  const style = {
    "--value": (theMovie ? theMovie.vote_average : 0) * 10,
    "--thickness": "3px",
    "--size": "2rem",
  } as React.CSSProperties;

  const link = () => {
    if (theMovie) return `/movie/${idTitleHyphen(theMovie.id, theMovie.title)}`;
    if (theTv) return `/tv/${idTitleHyphen(theTv.id, theTv.name)}`;
    if (thePerson)
      return `/person/${idTitleHyphen(thePerson.id, thePerson.name)}`;
    return "";
  };

  const date = () => {
    if (theMovie) return ReleaseDateUI(theMovie.release_date).releaseDate;
    if (theTv) return ReleaseDateUI(theTv.first_air_date).releaseDate;
    if (thePerson) return "";
    return "";
  };

  return (
    <div className="card bg-base-100 shadow-md shadow-primary">
      <figure>
        <Link href={link()} className="w-full">
          {(theMovie || theTv) && (
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
          {thePerson && (
            <ImageTMDB
              type="poster"
              alt={title}
              src={imageLink<ProfileSizes>(
                config?.images.secure_base_url!,
                "h632",
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
        {(theMovie || theTv) && (
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

        {(theMovie || theTv) && <p className="grow-0">{date()}</p>}
        {thePerson && (
          <div>
            {thePerson.known_for.map((movie, index) => (
              <small key={index}>
                {movie.title &&
                  `${movie.title}${
                    index === thePerson.known_for.length - 2
                      ? " and "
                      : index === thePerson.known_for.length - 1
                        ? ""
                        : ", "
                  }`}
              </small>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainCard;
