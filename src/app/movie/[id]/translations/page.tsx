import BackTo from "@/components/BackTo";
import MainTitleTranslations from "@/components/MainTitle/Translations";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import TranslationsFiltering from "@/components/Sidebar/MainTitle/TranslationsFiltering";
import {
  RQ_MOVIE_ENDPOINT,
  RQ_MOVIE_KEY,
  RQ_MOVIE_TRANSLATIONS_ENDPOINT,
  RQ_MOVIE_TRANSLATIONS_KEY,
} from "@/constants";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import movieMetadataTitle from "@/utils/movieMetadataTitle";
import { Metadata } from "next";

const pageTitle = "Translations";

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

export default function MovieTranslations({ params: { id } }: Props) {
  return (
    <>
      <BackTo
        queryKey={RQ_MOVIE_KEY(id)}
        endpoint={RQ_MOVIE_ENDPOINT(id)}
        backTo={{ label: "Main", link: `/movie/${id}` }}
      />

      <MainTitleSidebarLeft
        content={
          <MainTitleTranslations
            queryKey={RQ_MOVIE_TRANSLATIONS_KEY(id)}
            endpoint={RQ_MOVIE_TRANSLATIONS_ENDPOINT(id)}
          />
        }
        sidebar={
          <TranslationsFiltering
            title={pageTitle}
            queryKey={RQ_MOVIE_TRANSLATIONS_KEY(id)}
            endpoint={RQ_MOVIE_TRANSLATIONS_ENDPOINT(id)}
          />
        }
      />
    </>
  );
}
