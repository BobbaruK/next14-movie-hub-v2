import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import BurgerMenu from "./BurgerMenu";
import { MainNavigation } from "./MainNavigation";

interface Props {
  menu: MainTitleMenuItem[];
}

const MovieNavigation = ({ menu }: Props) => {
  return (
    <div className="relative z-10 flex items-center justify-center bg-primary p-4 shadow-md shadow-secondary md:justify-center">
      <MainNavigation menuItems={menu} />
      <BurgerMenu
        menuItems={menu}
        className="rounded-md border border-secondary p-2 hover:bg-secondary hover:text-secondary-foreground md:hidden"
        text="Movie navigation"
        showIcon
      />
    </div>
  );
};

export default MovieNavigation;
