import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import BurgerMenu from "./BurgerMenu";
import { MainNavigation } from "./MainNavigation";

interface Props {
  menu: MainTitleMenuItem[];
}

const MovieNavigation = ({ menu }: Props) => {
  return (
    <div className="relative z-10 flex items-center justify-center bg-primary p-4 shadow-md shadow-secondary md:justify-center">
      <MainNavigation menuItems={menu} className="hidden md:block" />
      <BurgerMenu
        menuItems={menu}
        className="md:hidden [&>button]:rounded-md [&>button]:border [&>button]:border-secondary [&>button]:p-2 [&>button]:hover:bg-secondary [&>button]:hover:text-secondary-foreground"
        label="Movie navigation"
        showIcon
      />
    </div>
  );
};

export default MovieNavigation;
