import Biography from "@/components/Person/Biography";
import { Credits } from "@/components/Person/Credits";
import PersonName from "@/components/Person/Name";
import AlsoKnownAs from "@/components/Person/PersonalInfo/AlsoKnownAs";
import Birthday from "@/components/Person/PersonalInfo/Birthday";
import Gender from "@/components/Person/PersonalInfo/Gender";
import KnownFor from "@/components/Person/PersonalInfo/KnownFor";
import PlaceOfBirth from "@/components/Person/PersonalInfo/PlaceOfBirth";
import PersonProfile from "@/components/Person/Profile";
import SocialMediaLinks from "@/components/Sidebar/MainTitle/SocialMediaLinks";
import {
  RQ_COMBINED_CREDITS_ENDPOINT,
  RQ_COMBINED_CREDITS_KEY,
  RQ_PERSON_ENDPOINT,
  RQ_PERSON_EXTERNAL_IDS_ENDPOINT,
  RQ_PERSON_EXTERNAL_IDS_KEY,
  RQ_PERSON_KEY,
} from "@/constants";
import { PeopleResponse } from "@/types/people/PeopleResponse";
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
  const person: PeopleResponse = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}`,
  ).then((res) => res.json());

  return {
    title: movieMetadataTitle(person.name),
  };
}

export default function Person({ params: { id } }: Props) {
  return (
    <div className="appContaier flex flex-col gap-8 py-20 lg:flex-row">
      <div className="flex flex-col gap-10 lg:basis-1/4">
        <div className="flex flex-col gap-2">
          <PersonProfile
            queryKey={RQ_PERSON_KEY(id)}
            endpoint={RQ_PERSON_ENDPOINT(id)}
          />
          <SocialMediaLinks
            queryKeyMainTitle={RQ_PERSON_KEY(id)}
            endpointMainTitle={RQ_PERSON_ENDPOINT(id)}
            queryKeyExternalIds={RQ_PERSON_EXTERNAL_IDS_KEY(id)}
            endpointExternalIds={RQ_PERSON_EXTERNAL_IDS_ENDPOINT(id)}
          />
        </div>

        <div className="flex flex-col gap-6">
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
          creditsQueryKey={RQ_COMBINED_CREDITS_KEY(id)}
          creditsEndpoint={RQ_COMBINED_CREDITS_ENDPOINT(id)}
        />
      </div>
    </div>
  );
}
