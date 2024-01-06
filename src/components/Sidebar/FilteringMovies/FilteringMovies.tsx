import { ByGenre } from "./ByGenre";
import { ByLanguage } from "./ByLanguage";
import { Sorting } from "./Sorting";

interface Props {
  genresRQKey: string;
}

const FilteringMovies = ({ genresRQKey }: Props) => {
  return (
    <>
      <Sorting />
      <h2 className="mt-14">Filtering</h2>
      <ByGenre rqKey={genresRQKey} />
      <ByLanguage />
    </>
  );
};

export default FilteringMovies;
