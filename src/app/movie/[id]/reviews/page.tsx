import BackTo from "@/components/BackTo";
import ReviewsGrid from "@/components/layouts/ReviewsGrid";
import {
  RQ_MOVIE_ENDPOINT,
  RQ_MOVIE_KEY,
  RQ_MOVIE_REVIEWS_ENDPOINT,
  RQ_MOVIE_REVIEWS_KEY,
} from "@/constants";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import movieMetadataTitle from "@/utils/movieMetadataTitle";
import { Metadata } from "next";

const pageTitle = "Reviews";

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
    title: movieMetadataTitle(movie.title, movie.release_date, pageTitle),
    description: movie.tagline,
  };
}

export default function MovieReviews({ params: { id } }: Props) {
  return (
    <>
      <BackTo
        queryKey={RQ_MOVIE_KEY(id)}
        endpoint={RQ_MOVIE_ENDPOINT(id)}
        backTo={{ label: "Main", link: `/movie/${id}` }}
      />
      <ReviewsGrid
        queryKey={RQ_MOVIE_REVIEWS_KEY(id)}
        endpoint={RQ_MOVIE_REVIEWS_ENDPOINT(id)}
      />
    </>
  );
}
