import MainTitleNavigation from "@/components/MainTitleNavigation/MainTitleNavigation";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import { ReactNode } from "react";

interface Props {
  params: {
    id: string;
  };
  children: ReactNode;
}

export default function MainTVTitleNavigationLayout({
  children, // will be a page or nested layout
  params: { id },
}: Props) {
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

  return (
    <>
      <MainTitleNavigation mainTitleMenu={mainTVShowMenu} />
      {children}
    </>
  );
}
