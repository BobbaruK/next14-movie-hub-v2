"use client";

import TMDBImages from "../TMDBImages";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";

const SearchFormDynamic = dynamic(() => import("../Forms/SearchForm"));

const HeroHome = () => {
  return (
    <div className=" relative p-0">
      <TMDBImages
        type={"other"}
        alt={"Hero Background"}
        src={
          "https://image.tmdb.org/t/p/original/tPwpc9Uo1Fly50urDxfGWWk7H77.jpg"
        }
        // sizes="238px"
        sizes={"100vw"}
        className={"z-0 h-videoImageHeight w-full"}
      />
      <div className="absolute left-1/2 top-1/2 flex w-full max-w-[900px] -translate-x-1/2 -translate-y-1/2  flex-col justify-center gap-4 rounded-md bg-secondary/90 p-4 md:gap-6 md:p-6 lg:gap-8 lg:p-8">
        <div>
          <h1 className="m-0">Welcome.</h1>
          <p>
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
        </div>
        <SearchFormDynamic formButton={<Button type="submit">Search</Button>} />
      </div>
    </div>
  );
};

export default HeroHome;
