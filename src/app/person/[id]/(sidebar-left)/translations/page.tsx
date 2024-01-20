import MainTitleTranslations from "@/components/MainTitle/Translations";
import TranslationsFiltering from "@/components/Sidebar/MainTitle/TranslationsFiltering";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import {
  RQ_PERSON_TRANSLATIONS_ENDPOINT,
  RQ_PERSON_TRANSLATIONS_KEY,
} from "@/constants";
import { PeopleResponse } from "@/types/people/PeopleResponse";
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
  const person: PeopleResponse = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}`,
  ).then((res) => res.json());

  return {
    title: movieMetadataTitle(person.name, null, "Translations"),
  };
}

export default function PersonTranslations({ params: { id } }: Props) {
  return (
    <MainTitleSidebarLeft
      content={
        <MainTitleTranslations
          queryKey={RQ_PERSON_TRANSLATIONS_KEY(id)}
          endpoint={RQ_PERSON_TRANSLATIONS_ENDPOINT(id)}
        />
      }
      sidebar={
        <TranslationsFiltering
          title={pageTitle}
          queryKey={RQ_PERSON_TRANSLATIONS_KEY(id)}
          endpoint={RQ_PERSON_TRANSLATIONS_ENDPOINT(id)}
        />
      }
    />
  );
}
