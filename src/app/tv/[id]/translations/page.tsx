import BackTo from "@/components/BackTo";
import MainTitleTranslations from "@/components/MainTitle/Translations";
import TranslationsFiltering from "@/components/Sidebar/MainTitle/TranslationsFiltering";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import { RQ_TVSHOW_KEY, RQ_TVSHOW_TRANSLATIONS_KEY } from "@/constants";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
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
  const movie: TVShowResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}`,
  ).then((res) => res.json());

  return {
    title: movieMetadataTitle(movie.name, movie.first_air_date, pageTitle),
    description: movie.tagline,
  };
}

export default function TVShowsTranslations({ params: { id } }: Props) {
  return (
    <div>
      <BackTo
        queryKey={RQ_TVSHOW_KEY(id)}
        backTo={{ label: "Main", link: `/tv/${id}` }}
      />

      <MainTitleSidebarLeft
        content={
          <MainTitleTranslations queryKey={RQ_TVSHOW_TRANSLATIONS_KEY(id)} />
        }
        sidebar={
          <TranslationsFiltering
            title={pageTitle}
            queryKey={RQ_TVSHOW_TRANSLATIONS_KEY(id)}
          />
        }
      />
    </div>
  );
}
