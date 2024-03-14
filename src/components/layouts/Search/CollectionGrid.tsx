"use client";

import CustomAlert from "@/components/CustomAlert";
import TMDBImages from "@/components/TMDBImages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RQ_SEARCH_COLLECTION_KEY, searchMovieCardImage } from "@/constants";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { SearchCollection } from "@/types/search/collections";
import { searchFetchConfig } from "@/utils/searchFetchConfig";
import { useQuery } from "@tanstack/react-query";
import { notFound, useSearchParams } from "next/navigation";
import MoviePagination from "../MoviePagination";

interface Props {
  query: string;
}

const CollectionGridSearch = ({ query }: Props) => {
  const searchParams = useSearchParams();
  const pageSearchParam = searchParams.get("page");
  const page = parseInt(pageSearchParam || "1");

  const searchConfig = searchFetchConfig(page, query);

  const { data, error, isLoading } = useQuery<
    MainTitleResponse<SearchCollection>
  >({
    queryKey: [RQ_SEARCH_COLLECTION_KEY(query), searchConfig.params],
  });

  if (error)
    throw new Error(`${RQ_SEARCH_COLLECTION_KEY(query)} - ${error.message}`);

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
      <h1>Search collection: &bdquo;{query}&rdquo;</h1>
      <MoviePagination page={page} response={data} />
      <div className="my-4 flex flex-col gap-4 lg:gap-8">
        {data.results.map((collection) => (
          <Card
            key={collection.id}
            className="flex-row overflow-hidden md:flex"
          >
            {/* <Link href={`/movie/${idTitleHyphen(movie.id, movie.title)}`}> */}
            <TMDBImages
              type="poster"
              alt={collection.name}
              src={collection.poster_path}
              className={`w-full md:w-32 md:min-w-36 ${searchMovieCardImage}`}
              sizes={`
                  (max-width: 320px) 285px,
                  (max-width: 639px) 588px,
                  (max-width: 767px) 716px,
                  144px
                `}
            />
            {/* </Link> */}
            <div className="flex flex-col justify-between gap-4">
              <CardHeader>
                <CardTitle className="m-0">
                  {/* <Link href={`/movie/${idTitleHyphen(collection.id, collection.title)}`}> */}
                  {collection.name}
                  {/* </Link> */}
                </CardTitle>
                {/* <CardDescription>
                  {ReleaseDateUI(collection.release_date).releaseDate}
                </CardDescription> */}
              </CardHeader>
              <CardContent>
                <p className="md:line-clamp-2">{collection.overview}</p>
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

export default CollectionGridSearch;
