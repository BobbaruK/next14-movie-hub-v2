import BackTo from "@/components/BackTo";
import Cast from "@/components/layouts/MainTitle/Cast";
import { RQ_MOVIE_CAST_KEY, RQ_MOVIE_KEY } from "@/constants";
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
    title: movieMetadataTitle(movie.title, movie.release_date, "Cast & Crew"),
    description: movie.tagline,
  };
}

export default function MovieCast({ params: { id } }: Props) {
  return (
    <>
      <BackTo
        queryKey={RQ_MOVIE_KEY(id)}
        backTo={{ label: "Main", link: `/movie/${id}` }}
      />
      <Cast queryKey={RQ_MOVIE_CAST_KEY(id)} />
    </>
  );
}
