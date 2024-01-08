import AlternativeTitles from "@/components/MainTitle/AlternativeTitles";
import MainTitleSidebarLeft from "@/components/MainTitleSidebarLeft";
import MainTitleFiltering from "@/components/Sidebar/MainTitle/Filtering";
import {
  RQ_MOVIE_ALTERNATIVE_TITLES_ENDPOINT,
  RQ_MOVIE_ALTERNATIVE_TITLES_KEY,
} from "@/constants";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import movieMetadataTitle from "@/utils/movieMetadataTitle";
import { Metadata } from "next";

const pageTitle = "Alternative Titles";

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

export default function MovieTitles({ params: { id } }: Props) {
  return (
    <>
      <MainTitleSidebarLeft
        content={
          <AlternativeTitles
            queryKey={RQ_MOVIE_ALTERNATIVE_TITLES_KEY(id)}
            endpoint={RQ_MOVIE_ALTERNATIVE_TITLES_ENDPOINT(id)}
          />
        }
        sidebar={
          <MainTitleFiltering
            title={pageTitle}
            queryKey={RQ_MOVIE_ALTERNATIVE_TITLES_KEY(id)}
            endpoint={RQ_MOVIE_ALTERNATIVE_TITLES_ENDPOINT(id)}
          />
        }
      />
    </>
  );
}
