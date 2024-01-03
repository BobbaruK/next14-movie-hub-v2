import { MoviesResponse } from "@/types/movies/movie/MoviesResponse";
import { TVShowsResponse } from "@/types/movies/tv/TVShowsResponse";
import MovieCard from "./MovieCard";

interface Props {
  movies: MoviesResponse | TVShowsResponse | undefined;
}

const MovieGrid = ({ movies }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {movies?.results?.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} index={index} />
      ))}
    </div>
  );
};

export default MovieGrid;
