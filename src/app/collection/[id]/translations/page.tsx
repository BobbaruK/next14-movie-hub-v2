import BackTo from "@/components/BackTo";
import MainTitleTranslations from "@/components/MainTitle/Translations";
import TranslationsFiltering from "@/components/Sidebar/MainTitle/TranslationsFiltering";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import { RQ_COLLECTION_KEY, RQ_COLLECTION_TRANSLATIONS_KEY } from "@/constants";
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

export default function CollectionTranslations({ params: { id } }: Props) {
  return (
    <>
      <BackTo
        queryKey={RQ_COLLECTION_KEY(id)}
        backTo={{ label: "Collection", link: `/collection/${id}` }}
      />

      <MainTitleSidebarLeft
        content={
          <MainTitleTranslations
            queryKey={RQ_COLLECTION_TRANSLATIONS_KEY(id)}
          />
        }
        sidebar={
          <TranslationsFiltering
            title={pageTitle}
            queryKey={RQ_COLLECTION_TRANSLATIONS_KEY(id)}
          />
        }
      />
    </>
  );
}
