import BackTo from "@/components/BackTo";
import AlternativeTitles from "@/components/MainTitle/AlternativeTitles";
import MainTitleSidebarLeft from "@/components/MainTitleSidebarLeft";
import AlternativeTitlesFiltering from "@/components/Sidebar/MainTitle/AlternativeTitlesFiltering";
import {
  RQ_MOVIE_ALTERNATIVE_TITLES_ENDPOINT,
  RQ_MOVIE_ALTERNATIVE_TITLES_KEY,
  RQ_MOVIE_ENDPOINT,
  RQ_MOVIE_KEY,
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
      <BackTo
        queryKey={RQ_MOVIE_KEY(id)}
        endpoint={RQ_MOVIE_ENDPOINT(id)}
        backTo={{ label: "Main", link: `/movie/${id}` }}
      />
      <MainTitleSidebarLeft
        content={
          <AlternativeTitles
            queryKey={RQ_MOVIE_ALTERNATIVE_TITLES_KEY(id)}
            endpoint={RQ_MOVIE_ALTERNATIVE_TITLES_ENDPOINT(id)}
          />
        }
        sidebar={
          <AlternativeTitlesFiltering
            title={pageTitle}
            queryKey={RQ_MOVIE_ALTERNATIVE_TITLES_KEY(id)}
            endpoint={RQ_MOVIE_ALTERNATIVE_TITLES_ENDPOINT(id)}
          />
        }
      />
    </>
  );
}
