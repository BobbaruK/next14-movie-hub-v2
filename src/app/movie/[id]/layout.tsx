import MainTitleHeroSection from "@/components/MainTitleHeroSection";
import MainTitleNavigation from "@/components/MainTitleNavigation";
import { RQ_MOVIE_ENDPOINT, RQ_MOVIE_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { ReactNode } from "react";

interface Props {
  params: {
    id: string;
  };
  children: ReactNode;
}

export default async function MainTitleNavigationLayout({
  children, // will be a page or nested layout
  params: { id },
}: Props) {
  const queryClient = new QueryClient();

  const mainMovieMenu: MainTitleMenuItem[] = [
    {
      label: "Overview",
      href: `/movie/${id}/`,
      children: [
        {
          label: "Main",
          href: `/movie/${id}`,
        },
        {
          label: "Alternative Titles",
          href: `/movie/${id}/titles`,
        },
        {
          label: "Cast & Crew",
          href: `/movie/${id}/cast`,
        },
        {
          label: "Release Dates",
          href: `/movie/${id}/releases`,
        },
        {
          label: "Translations",
          href: `/movie/${id}/translations`,
        },
      ],
    },
    {
      label: "Backdrops",
      href: `/movie/${id}/images/backdrops`,
    },
    {
      label: "Logos",
      href: `/movie/${id}/images/logos`,
    },
    {
      label: "Posters",
      href: `/movie/${id}/images/posters`,
    },
    {
      label: "Videos",
      href: `/movie/${id}/videos`,
    },
  ];

  const apiClientLanguages = new MyAPIClient<MovieResponse>(
    RQ_MOVIE_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_KEY(id)],
    queryFn: () => apiClientLanguages.getAll(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MainTitleNavigation mainTitleMenu={mainMovieMenu} />
        {children}
      </HydrationBoundary>
    </>
  );
}
