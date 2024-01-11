import Biography from "@/components/Person/Biography";
import PersonName from "@/components/Person/Name";
import PersonProfile from "@/components/Person/Profile";
import { RQ_PERSON_ENDPOINT, RQ_PERSON_KEY } from "@/constants";
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
    title: movieMetadataTitle(person.name),
  };
}

export default function Person({ params: { id } }: Props) {
  return (
    <div>
      <PersonProfile
        queryKey={RQ_PERSON_KEY(id)}
        endpoint={RQ_PERSON_ENDPOINT(id)}
      />
      <PersonName
        queryKey={RQ_PERSON_KEY(id)}
        endpoint={RQ_PERSON_ENDPOINT(id)}
      />
      <br />
      <Biography
        queryKey={RQ_PERSON_KEY(id)}
        endpoint={RQ_PERSON_ENDPOINT(id)}
      />
    </div>
  );
}
