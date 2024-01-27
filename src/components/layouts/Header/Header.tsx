import { MainNavigation } from "@/components/MainNavigation";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";

import BurgerMenu from "@/components/BurgerMenu";
import Link from "next/link";

const Header = () => {
  const menuItems: MainTitleMenuItem[] = [
    {
      label: "Movies",
      children: [
        {
          label: "Popular",
          href: `/movie/`,
          descriptionLabel: "Popular Movies",
        },
        {
          label: "Now Playing",
          href: `/movie/now-playing`,
          descriptionLabel: "Now Playing Movies",
        },
        {
          label: "Upcoming",
          href: `/movie/upcoming`,
          descriptionLabel: "Upcoming Movies",
        },
        {
          label: "Top Rated",
          href: `/movie/top-rated`,
          descriptionLabel: "Top Rated Movies",
        },
      ],
    },
    {
      label: "TV Shows",
      children: [
        {
          label: "Popular",
          href: "/tv",
          descriptionLabel: "Popular TV Shows",
        },
        {
          label: "Airing Today",
          href: "/tv/airing-today",
          descriptionLabel: "TV Shows Airing Today",
        },
        {
          label: "On TV",
          href: "/tv/on-the-air",
          descriptionLabel: "Currently Airing TV Shows",
        },
        {
          label: "Top Rated",
          href: "/tv/top-rated",
          descriptionLabel: "Top Rated TV Shows",
        },
      ],
    },
    {
      label: "People",
      children: [
        {
          label: "Popular",
          href: "/person",
          descriptionLabel: "Popular People",
        },
      ],
    },
  ];

  return (
    <>
      <header className="relative z-20">
        <div className="appContaier flex items-center justify-start gap-8 py-8">
          <div>
            <Link
              href="/"
              className="block rounded-md border py-2 px-6 text-center font-bold hover:bg-secondary hover:text-secondary-foreground"
            >
              SCSSeco's <br /> MovieHub
            </Link>
          </div>
          <MainNavigation menuItems={menuItems} />
          <BurgerMenu menuItems={menuItems} className="ms-auto" />
        </div>
      </header>
    </>
  );
};

export default Header;
