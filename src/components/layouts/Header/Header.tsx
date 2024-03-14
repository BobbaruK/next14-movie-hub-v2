import { MainNavigation } from "@/components/MainNavigation";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import BurgerMenu from "@/components/BurgerMenu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import SearchDrawer from "./SearchDrawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <div className="container flex items-center justify-between gap-2 py-8">
          <div>
            <Link
              href="/"
              className="block rounded-md border px-6 py-2 text-center font-bold hover:bg-secondary hover:text-secondary-foreground"
            >
              SCSSeco&apos;s <br /> MovieHub
            </Link>
          </div>
          <MainNavigation menuItems={menuItems} className="hidden md:block" />
          <div className="flex items-center gap-2">
            <Avatar className="border">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <SearchDrawer />
            <BurgerMenu
              menuItems={menuItems}
              className="ms-auto md:hidden [&>button]:rounded-md [&>button]:border [&>button]:border-secondary [&>button]:bg-primary [&>button]:p-2 [&>button]:hover:bg-secondary [&>button]:hover:text-secondary-foreground"
            />
            <div className="ms-auto hidden md:flex">
              <div className="hidden md:block">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
