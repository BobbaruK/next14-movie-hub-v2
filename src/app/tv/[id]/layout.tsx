import MainTitleNavigation from "@/components/MainTitle/Navigation";
import {
  RQ_TVSHOW_CAST_ENDPOINT,
  RQ_TVSHOW_CAST_KEY,
  RQ_TVSHOW_ENDPOINT,
  RQ_TVSHOW_KEY,
  RQ_TVSHOW_KEYWORDS_ENDPOINT,
  RQ_TVSHOW_KEYWORDS_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { CastAndCrew } from "@/types/movies/CastAndCrew";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import { MovieKeywords } from "@/types/movies/movie/MovieKeywords";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import movieMetadataTitle from "@/utils/movieMetadataTitle";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { ReactNode } from "react";

interface Props {
  params: {
    id: string;
  };
  children: ReactNode;
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const movie: TVShowResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}`,
  ).then((res) => res.json());

  return {
    title: movieMetadataTitle(movie.name, movie.first_air_date),
    description: movie.tagline,
  };
}

export default async function MainTVTitleNavigationLayout({
  children, // will be a page or nested layout
  params: { id },
}: Props) {
  const queryClient = new QueryClient();

  const mainTVShowMenu: MainTitleMenuItem[] = [
    {
      label: "Overview",
      href: `/tv/${id}/`,
      children: [
        {
          label: "Main",
          href: `/tv/${id}`,
        },
        {
          label: "Alternative Titles",
          href: `/tv/${id}/titles`,
        },
        {
          label: "Cast & Crew",
          href: `/tv/${id}/cast`,
        },
        {
          label: "Seasons",
          href: `/tv/${id}/seasons`,
        },
        {
          label: "Translations",
          href: `/tv/${id}/translations`,
        },
      ],
    },
    {
      label: "Backdrops",
      href: `/tv/${id}/images/backdrops`,
    },
    {
      label: "Logos",
      href: `/tv/${id}/images/logos`,
    },
    {
      label: "Posters",
      href: `/tv/${id}/images/posters`,
    },
    {
      label: "Videos",
      href: `/tv/${id}/videos`,
    },
  ];

  const apiClientLanguages = new MyAPIClient<TVShowResponse>(
    RQ_TVSHOW_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_KEY(id)],
    queryFn: () => apiClientLanguages.getAll(),
  });

  const apiClientKeywords = new MyAPIClient<MovieKeywords>(
    RQ_TVSHOW_KEYWORDS_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_KEYWORDS_KEY(id)],
    queryFn: () => apiClientKeywords.getAll(),
  });

  const apiClientCast = new MyAPIClient<CastAndCrew>(
    RQ_TVSHOW_CAST_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_CAST_KEY(id)],
    queryFn: () => apiClientCast.getAll(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MainTitleNavigation mainTitleMenu={mainTVShowMenu} />
        {children}
      </HydrationBoundary>
    </>
  );
}
