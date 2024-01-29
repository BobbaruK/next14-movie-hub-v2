import { Movie } from "@/types/movies/movie/MoviesResponse";
import { TVShow } from "@/types/movies/tv/TVShowsResponse";
import { People } from "@/types/people/PeoplesResponse";
import idTitleHyphen from "@/utils/idTitleHyphen";
import ReleaseDateUI from "@/utils/releaseDateUI";
import Link from "next/link";
import TMDBImages from "../TMDBImages";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  movie: Movie | TVShow | People;
  imageClass?: string;
}

const MainCard = ({ movie, imageClass, ...restProps }: Props) => {
  const title = "title" in movie ? movie.title : movie.name;

  restProps.className

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

  // $

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <Link href={link()} className="relative w-full">
        {(theMovie || theTv) && (
          <>
            <Badge
              variant={
                movie.vote_average > 7.5
                  ? "default"
                  : movie.vote_average > 6.0
                    ? "secondary"
                    : "destructive"
              }
              className="absolute left-2 top-2 z-10"
            >
              {movie.vote_average.toFixed(1)}
            </Badge>
            <TMDBImages
              type={{ type: "poster", size: "w342" }}
              alt={title}
              src={movie.poster_path}
              // width={342}
              // height={513}
              style={
                {
                  // height: "clamp(25rem, 27.4074rem + -12.037vw, 16.875rem)",
                }
              }
              className="h-main-card-image-height sm:h-main-card-image-height-sm md:h-main-card-image-height-md lg:h-main-card-image-height-lg xl:h-main-card-image-height-xl"
            />
          </>
        )}
        {thePerson && (
          <TMDBImages
            type={{ type: "profile", size: "h632" }}
            alt={title}
            src={movie.profile_path}
            style={
              {
                // height: "clamp(25rem, 27.4074rem + -12.037vw, 16.875rem)",
              }
            }
            // width={342}
            // height={513}
            className="h-main-card-image-height sm:h-main-card-image-height-sm md:h-main-card-image-height-md lg:h-main-card-image-height-lg xl:h-main-card-image-height-xl"
          />
        )}
      </Link>
      <CardHeader>
        <CardTitle className="m-0">
          <Link href={link()} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </CardTitle>

        {(theMovie || theTv) && (
          <CardDescription className="grow-0">{date()}</CardDescription>
        )}
      </CardHeader>
      {thePerson && (
        <CardContent className="my-auto">
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
        </CardContent>
      )}
    </Card>
  );
};

export default MainCard;
