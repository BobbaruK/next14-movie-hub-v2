import BackTo from "@/components/BackTo";
import AlternativeTitles from "@/components/MainTitle/AlternativeTitles";
import AlternativeTitlesFiltering from "@/components/Sidebar/MainTitle/AlternativeTitlesFiltering";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import {
  RQ_TVSHOW_ALTERNATIVE_TITLES_KEY,
  RQ_TVSHOW_ALTERNATIVE_TITLES_ENDPOINT,
  RQ_TVSHOW_ENDPOINT,
  RQ_TVSHOW_KEY,
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
      <BackTo
        queryKey={RQ_TVSHOW_KEY(id)}
        endpoint={RQ_TVSHOW_ENDPOINT(id)}
        backTo={{ label: "Main", link: `/tv/${id}` }}
      />
      <MainTitleSidebarLeft
        content={
          <AlternativeTitles
            queryKey={RQ_TVSHOW_ALTERNATIVE_TITLES_KEY(id)}
            endpoint={RQ_TVSHOW_ALTERNATIVE_TITLES_ENDPOINT(id)}
          />
        }
        sidebar={
          <AlternativeTitlesFiltering
            title={pageTitle}
            queryKey={RQ_TVSHOW_ALTERNATIVE_TITLES_KEY(id)}
            endpoint={RQ_TVSHOW_ALTERNATIVE_TITLES_ENDPOINT(id)}
          />
        }
      />
    </>
  );
}
