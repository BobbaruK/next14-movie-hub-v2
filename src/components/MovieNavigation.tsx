import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import BurgerMenu from "./BurgerMenu";
import { MainNavigation } from "./MainNavigation";

interface Props {
  menu: MainTitleMenuItem[];
}

const MovieNavigation = ({ menu }: Props) => {
  return (
    <div className="flex items-center justify-end bg-primary p-4 md:justify-center shadow-md shadow-secondary relative z-10">
      <MainNavigation menuItems={menu} />
      <BurgerMenu menuItems={menu} />
    </div>
  );
};

export default MovieNavigation;
