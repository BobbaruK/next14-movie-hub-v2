import MainTitleHeroSection from "@/components/MainTitleHeroSection";
import MainTitleNavigation from "@/components/MainTitleNavigation";
import { RQ_TVSHOW_ENDPOINT, RQ_TVSHOW_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { ReactNode } from "react";

interface Props {
  params: {
    id: string;
  };
  children: ReactNode;
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

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MainTitleNavigation mainTitleMenu={mainTVShowMenu} />
        {children}
      </HydrationBoundary>
    </>
  );
}
