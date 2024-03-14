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
import { RQ_SEARCH_MULTI_KEY, searchMovieCardImage } from "@/constants";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { People } from "@/types/people/PeoplesResponse";
import { SearchMovieResponse } from "@/types/search/movies";
import { SearchTVShowResponse } from "@/types/search/tvshows";
import idTitleHyphen from "@/utils/idTitleHyphen";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { searchFetchConfig } from "@/utils/searchFetchConfig";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import MoviePagination from "../MoviePagination";
import { SearchPeopleResponse } from "@/types/search/people";

interface Props {
  query: string;
}

const MultiGridSearch = ({ query }: Props) => {
  const searchParams = useSearchParams();
  const pageSearchParam = searchParams.get("page");
  const page = parseInt(pageSearchParam || "1");

  const searchConfig = searchFetchConfig(page, query);

  const { data, error, isLoading } = useQuery<
    MainTitleResponse<
      SearchMovieResponse | SearchTVShowResponse | SearchPeopleResponse
    >
  >({
    queryKey: [RQ_SEARCH_MULTI_KEY(query), searchConfig.params],
  });

  if (error)
    throw new Error(`${RQ_SEARCH_MULTI_KEY(query)} - ${error.message}`);

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
      <h1>Search movies, tv shows and people: &bdquo;{query}&rdquo;</h1>
      <MoviePagination page={page} response={data} />
      <div className="my-4 flex flex-col gap-4 lg:gap-8">
        {data.results.map((multi) => {
          let title = "";
          let image = "";
          let release = "";
          let overview = "";

          switch (multi.media_type) {
            case "movie":
              title = multi.title;
              image = multi.poster_path;
              release = multi.release_date;
              overview = multi.overview;
              break;

            case "tv":
              title = multi.name;
              image = multi.poster_path;
              release = multi.first_air_date;
              overview = multi.overview;
              break;

            case "person":
              title = multi.name;
              image = multi.profile_path;
              release = "";
              overview = "";
              break;
          }

          return (
            <Card key={multi.id} className="flex-row overflow-hidden md:flex">
              <Link href={`/${multi.media_type}/${idTitleHyphen(multi.id, title)}`}>
                <TMDBImages
                  type="poster"
                  alt={title}
                  src={image}
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
                    <Link
                      href={`/${multi.media_type}/${idTitleHyphen(multi.id, title)}`}
                    >
                      {title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {multi.media_type === "person" ? (
                      <>
                        {multi.known_for_department}
                        {multi.known_for.length > 0 && (
                          <>
                            &nbsp;&bull;&nbsp;
                            {multi.known_for.map((chestie, index) => {
                              if (chestie.title)
                                return (
                                  <Link
                                    href={`/${chestie.media_type}/${idTitleHyphen(chestie.id, chestie.title)}`}
                                  >
                                    {chestie.title}{" "}
                                    {index < multi.known_for.length - 1 && ", "}
                                  </Link>
                                );
                            })}
                          </>
                        )}
                      </>
                    ) : (
                      ReleaseDateUI(release).releaseDate
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="md:line-clamp-2">{overview}</p>
                </CardContent>
                {/* <CardFooter>
                <p>Card Footer</p>
              </CardFooter> */}
              </div>
            </Card>
          );
        })}
      </div>
      <MoviePagination page={page} response={data} />
    </>
  );
};

export default MultiGridSearch;
