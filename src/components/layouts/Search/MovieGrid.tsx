"use client";

import CustomAlert from "@/components/CustomAlert";
import TMDBImages from "@/components/TMDBImages";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RQ_SEARCH_MOVIE_KEY, searchMovieCardImage } from "@/constants";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { SearchMovieResponse } from "@/types/search/movies";
import idTitleHyphen from "@/utils/idTitleHyphen";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { searchFetchConfig } from "@/utils/searchFetchConfig";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import MoviePagination from "../MoviePagination";

interface Props {
  query: string;
}

// TODO: handle errors on all search pages

const MovieGridSearch = ({ query }: Props) => {
  const searchParams = useSearchParams();
  const pageSearchParam = searchParams.get("page");
  const page = parseInt(pageSearchParam || "1");

  const searchConfig = searchFetchConfig(page, query);

  const { data, error, isLoading } = useQuery<
    MainTitleResponse<SearchMovieResponse>
  >({
    queryKey: [RQ_SEARCH_MOVIE_KEY(query), searchConfig.params],
  });

  if (error)
    throw new Error(`${RQ_SEARCH_MOVIE_KEY(query)} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant={"default"}
        title={"Searched movies"}
        description="Loading... Please be patient"
        className="container"
      />
    );

  if ((data && page > data?.total_pages) || !query) notFound();

  // if (!query)
  //   return (
  //     <CustomAlert
  //       variant={"destructive"}
  //       title={"Error"}
  //       description="No query passed to search"
  //     />
  //   );

  if (!data?.results.length)
    return (
      <CustomAlert
        variant={"default"}
        title={"No Entries"}
        description="No entries found"
      />
    );

  return (
    <>
      {/* {page} */}
      <h1>Search: {query}</h1>
      <MoviePagination page={page} response={data} />
      <div className="my-4 flex flex-col gap-4 lg:gap-8">
        {data.results.map((movie) => (
          <Card key={movie.id} className="flex-row overflow-hidden md:flex">
            <Link href={`/movie/${idTitleHyphen(movie.id, movie.title)}`}>
              <TMDBImages
                type="poster"
                alt={movie.title}
                src={movie.poster_path!}
                className={`w-full md:w-32 md:min-w-36 ${searchMovieCardImage}`}
                sizes={`
                (max-width: 320px) 285px,
                (max-width: 639px) 588px,
                (max-width: 767px) 716px,
                144px
              `}
              />
            </Link>
            <div className="flex flex-col justify-between gap-4">
              <CardHeader>
                <CardTitle className="m-0">
                  <Link href={`/movie/${idTitleHyphen(movie.id, movie.title)}`}>
                    {movie.title}
                  </Link>
                </CardTitle>
                <CardDescription>
                  {ReleaseDateUI(movie.release_date).releaseDate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="md:line-clamp-2">{movie.overview}</p>
              </CardContent>
              {/* <CardFooter>
                <p>Card Footer</p>
              </CardFooter> */}
            </div>
          </Card>
        ))}
      </div>
      <MoviePagination page={page} response={data} />
    </>
  );
};

export default MovieGridSearch;
