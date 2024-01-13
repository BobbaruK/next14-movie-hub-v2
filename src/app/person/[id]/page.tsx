import Biography from "@/components/Person/Biography";
import { Credits } from "@/components/Person/Credits";
import PersonName from "@/components/Person/Name";
import AlsoKnownAs from "@/components/Person/PersonalInfo/AlsoKnownAs";
import Birthday from "@/components/Person/PersonalInfo/Birthday";
import Gender from "@/components/Person/PersonalInfo/Gender";
import KnownFor from "@/components/Person/PersonalInfo/KnownFor";
import PlaceOfBirth from "@/components/Person/PersonalInfo/PlaceOfBirth";
import PersonProfile from "@/components/Person/Profile";
import {
  RQ_COMBINED_CREDITS_ENDPOINT,
  RQ_COMBINED_CREDITS_KEY,
  RQ_PERSON_ENDPOINT,
  RQ_PERSON_KEY,
} from "@/constants";
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
    <>
      <div className="appContaier flex flex-col gap-8 py-20 lg:flex-row">
        <div className="flex flex-col gap-10 lg:basis-1/4">
          <PersonProfile
            queryKey={RQ_PERSON_KEY(id)}
            endpoint={RQ_PERSON_ENDPOINT(id)}
          />
          <div className="flex flex-col gap-6">
            social media aici
            <h2 className="m-0">Personal info</h2>
            <KnownFor
              queryKey={RQ_PERSON_KEY(id)}
              endpoint={RQ_PERSON_ENDPOINT(id)}
            />
            <Gender
              queryKey={RQ_PERSON_KEY(id)}
              endpoint={RQ_PERSON_ENDPOINT(id)}
            />
            <Birthday
              queryKey={RQ_PERSON_KEY(id)}
              endpoint={RQ_PERSON_ENDPOINT(id)}
            />
            <PlaceOfBirth
              queryKey={RQ_PERSON_KEY(id)}
              endpoint={RQ_PERSON_ENDPOINT(id)}
            />
            <AlsoKnownAs
              queryKey={RQ_PERSON_KEY(id)}
              endpoint={RQ_PERSON_ENDPOINT(id)}
            />
          </div>
        </div>
        <div className="lg:basis-3/4">
          <PersonName
            queryKey={RQ_PERSON_KEY(id)}
            endpoint={RQ_PERSON_ENDPOINT(id)}
          />
          <Biography
            queryKey={RQ_PERSON_KEY(id)}
            endpoint={RQ_PERSON_ENDPOINT(id)}
          />
          <Credits
            queryKey={RQ_COMBINED_CREDITS_KEY(id)}
            endpoint={RQ_COMBINED_CREDITS_ENDPOINT(id)}
          />
        </div>
      </div>
    </>
  );
}
