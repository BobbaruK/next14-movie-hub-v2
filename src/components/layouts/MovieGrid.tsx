import { MainTitleResponse } from "@/types/MainTitleResponse";
import { Movie } from "@/types/movies/movie/MoviesResponse";
import { TVShow } from "@/types/movies/tv/TVShowsResponse";
import { People } from "@/types/people/PeoplesResponse";
import MainCard from "../Cards/Main";

interface Props {
  movies:
    | MainTitleResponse<Movie>
    | MainTitleResponse<TVShow>
    | MainTitleResponse<People>;
}

const MovieGrid = ({ movies }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {movies?.results.map((movie) => (
        <MainCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
