import React from "react";
import { ByGenre } from "./ByGenre";
import { ByLanguage } from "./ByLanguage";
import { Sorting } from "./Sorting";

const FilteringMovies = () => {
  return (
    <>

      
      <Sorting />

      <h2 className="mt-14">Filtering</h2>
      <ByGenre />
      <ByLanguage />
    </>
  );
};

export default FilteringMovies;
