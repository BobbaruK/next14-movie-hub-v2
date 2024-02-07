import BackTo from "@/components/BackTo";
import ReleaseDates from "@/components/MainTitle/movie/ReleaseDates";
import ReleasesFiltering from "@/components/Sidebar/MainTitle/ReleasesFiltering";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import { RQ_MOVIE_KEY, RQ_MOVIE_RELEASES_KEY } from "@/constants";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import movieMetadataTitle from "@/utils/movieMetadataTitle";
import { Metadata } from "next";

const pageTitle = "Release Dates";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const movie: MovieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,
  ).then((res) => res.json());

  return {
    title: movieMetadataTitle(movie.title, movie.release_date, pageTitle),
    description: movie.tagline,
  };
}

export default function MovieReleases({ params: { id } }: Props) {
  return (
    <>
      <BackTo
        queryKey={RQ_MOVIE_KEY(id)}
        backTo={{ label: "Main", link: `/movie/${id}` }}
      />

      <MainTitleSidebarLeft
        content={<ReleaseDates queryKey={RQ_MOVIE_RELEASES_KEY(id)} />}
        sidebar={
          <ReleasesFiltering
            title={pageTitle}
            queryKey={RQ_MOVIE_RELEASES_KEY(id)}
          />
        }
      />
    </>
  );
}
