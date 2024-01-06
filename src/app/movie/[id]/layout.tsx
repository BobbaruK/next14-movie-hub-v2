import MainTitleNavigation from "@/components/MainTitleNavigation/MainTitleNavigation";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import { ReactNode } from "react";

interface Props {
  params: {
    id: string;
  };
  children: ReactNode;
}

export default function MainTitleNavigationLayout({
  children, // will be a page or nested layout
  params: { id },
}: Props) {
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

  return (
    <>
      <MainTitleNavigation mainTitleMenu={mainMovieMenu} />
      {children}
    </>
  );
}
