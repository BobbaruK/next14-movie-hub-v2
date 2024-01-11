import { People } from "@/types/people/PeoplesResponse";
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
  const person: People = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}`,
  ).then((res) => res.json());

  return {
    title: movieMetadataTitle(person.name, null, "Translations"),
  };
}

export default function PersonTranslations({ params: { id } }: Props) {
  return (
    <div>
      <h1>Person ({id}) Translations</h1>
    </div>
  );
}
