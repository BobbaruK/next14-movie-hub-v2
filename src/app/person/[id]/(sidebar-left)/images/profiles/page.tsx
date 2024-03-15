import ImagesFiltering from "@/components/Sidebar/MainTitle/ImagesFiltering";
import ImagesGrid from "@/components/layouts/ImagesGrid";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import { RQ_MOVIE_IMAGES_KEY, RQ_PERSON_IMAGES_KEY } from "@/constants";
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
    title: movieMetadataTitle(person.name, null, "Profile Images"),
  };
}

export default function PersonImagesProfiles({ params: { id } }: Props) {
  return (
    <MainTitleSidebarLeft
      content={
        <ImagesGrid
          queryKey={RQ_PERSON_IMAGES_KEY(id)}
          imagesType="profiles"
          imageDetails={{
            classes:
              "h-postersImageHeight sm:h-postersImageHeight-sm md:h-postersImageHeight-md lg:h-postersImageHeight-lg xl:h-postersImageHeight-xl",
            sizes: `
              (max-width: 320px) 150px,
              (max-width: 767px) 285px,
              (max-width: 1023px) 312px,
              (max-width: 1279px) 210px,
              343px
            `,
            type: "profile",
          }}
        />
      }
      sidebar={
        <ImagesFiltering
          title="Profiles"
          queryKey={RQ_PERSON_IMAGES_KEY(id)}
          imagesType="profiles"
          titleType="movie"
        />
      }
    />
  );
}
