import BackTo from "@/components/BackTo";
import MainTitleTranslations from "@/components/MainTitle/Translations";
import TranslationsFiltering from "@/components/Sidebar/MainTitle/TranslationsFiltering";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import { RQ_COLLECTION_KEY, RQ_COLLECTION_TRANSLATIONS_KEY } from "@/constants";
import { Collection } from "@/types/Collection";
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
  const collection: Collection = await fetch(
    `https://api.themoviedb.org/3/collection/${id}?api_key=${process.env.TMDB_API_KEY}`,
  ).then((res) => res.json());

  return {
    title: movieMetadataTitle(collection.name, null, pageTitle),
    description: collection.overview,
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
