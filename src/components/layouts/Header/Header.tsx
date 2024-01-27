import { MainNavigation } from "@/components/MainNavigation";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";

import BurgerMenu from "@/components/BurgerMenu";

const Header = () => {
  const menuItems: MainTitleMenuItem[] = [
    {
      label: "Movies",
      children: [
        {
          label: "Main",
          href: `/movie/`,
          descriptionLabel: "Popular movies",
        },
        {
          label: "Now Playing",
          href: `/movie/now-playing`,
          descriptionLabel: "Now Playing movies",
        },
        {
          label: "Upcoming",
          href: `/movie/upcoming`,
          descriptionLabel: "Upcoming movies",
        },
        {
          label: "Top Rated",
          href: `/movie/top-rated`,
          descriptionLabel: "Top Rated movies",
        },
      ],
    },
    {
      label: "TV Shows",
      children: [
        {
          label: "Popular",
          href: "/tv",
          descriptionLabel: "Popular tv shows",
        },
        {
          label: "Airing Today",
          href: "/tv",
          descriptionLabel: "Airing Today tv shows",
        },
        {
          label: "On TV",
          href: "/tv/on-the-air",
          descriptionLabel: "Upcoming tv shows",
        },
        {
          label: "Top Rated",
          href: "/tv/top-rated",
          descriptionLabel: "Top Rated tv shows",
        },
      ],
    },
    {
      label: "People",
      children: [
        {
          label: "Popular",
          href: "/person",
          descriptionLabel: "Popular people",
        },
      ],
    },
  ];

  return (
    <>
      <header className="relative z-20">
        <div className="appContaier flex justify-between py-8">
          <div>Logo</div>
          <MainNavigation menuItems={menuItems} />
          <BurgerMenu menuItems={menuItems} />
        </div>
      </header>
    </>
  );
};

export default Header;
