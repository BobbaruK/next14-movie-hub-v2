import React from "react";
import { ByGenre } from "./ByGenre";
import { ByLanguage } from "./ByLanguage";
import { Sorting } from "./Sorting";
import { RQ_MOVIES_GENRES_KEY } from "@/constants";

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
