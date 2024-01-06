import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import movieMetadataTitle from "@/utils/movieMetadataTitle";
import { Metadata } from "next";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const movie: MovieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,
  ).then((res) => res.json());

  return {
    title: movieMetadataTitle(
      movie.title,
      movie.release_date,
      "Alternative Titles",
    ),
    description: movie.tagline,
  };
}

export default function MovieTitles({ params: { id } }: Props) {
  return (
    <div>
      <h1>Movie Titles: {id}</h1>
    </div>
  );
}
