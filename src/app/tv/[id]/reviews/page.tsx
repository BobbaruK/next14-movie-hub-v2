import BackTo from "@/components/BackTo";
import ReviewsGrid from "@/components/layouts/ReviewsGrid";
import {
  RQ_TVSHOW_ENDPOINT,
  RQ_TVSHOW_KEY,
  RQ_TVSHOW_REVIEWS_ENDPOINT,
  RQ_TVSHOW_REVIEWS_KEY,
} from "@/constants";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
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
  const tvShow: TVShowResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}`,
  ).then((res) => res.json());

  return {
    title: movieMetadataTitle(tvShow.name, tvShow.first_air_date, pageTitle),
    description: tvShow.tagline,
  };
}

export default function TVShowReviews({ params: { id } }: Props) {
  return (
    <>
      <BackTo
        queryKey={RQ_TVSHOW_KEY(id)}
        endpoint={RQ_TVSHOW_ENDPOINT(id)}
        backTo={{ label: "Main", link: `/tv/${id}` }}
      />
      <ReviewsGrid
        queryKey={RQ_TVSHOW_REVIEWS_KEY(id)}
        endpoint={RQ_TVSHOW_REVIEWS_ENDPOINT(id)}
      />
    </>
  );
}
