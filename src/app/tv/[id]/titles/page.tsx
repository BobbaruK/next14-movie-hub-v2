import AlternativeTitles from "@/components/MainTitle/AlternativeTitles";
import MainTitleSidebarLeft from "@/components/MainTitleSidebarLeft";
import MainTitleFiltering from "@/components/Sidebar/MainTitle/Filtering";
import {
  RQ_TVSHOW_ALTERNATIVE_TITLES_KEY,
  RQ_TVSHOW_ALTERNATIVE_TITLES_ENDPOINT,
} from "@/constants";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import movieMetadataTitle from "@/utils/movieMetadataTitle";
import { Metadata } from "next";

const pageTitle = "Alternative Titles";

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

export default function TVShowsTitles({ params: { id } }: Props) {
  return (
    <>
      <MainTitleSidebarLeft
        content={
          <AlternativeTitles
            queryKey={RQ_TVSHOW_ALTERNATIVE_TITLES_KEY(id)}
            endpoint={RQ_TVSHOW_ALTERNATIVE_TITLES_ENDPOINT(id)}
          />
        }
        sidebar={
          <MainTitleFiltering
            title={pageTitle}
            queryKey={RQ_TVSHOW_ALTERNATIVE_TITLES_KEY(id)}
            endpoint={RQ_TVSHOW_ALTERNATIVE_TITLES_ENDPOINT(id)}
          />
        }
      />
    </>
  );
}
