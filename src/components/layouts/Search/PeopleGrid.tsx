"use client";

import CustomAlert from "@/components/CustomAlert";
import TMDBImages from "@/components/TMDBImages";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RQ_SEARCH_PEOPLE_KEY, searchMovieCardImage } from "@/constants";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { People } from "@/types/people/PeoplesResponse";
import idTitleHyphen from "@/utils/idTitleHyphen";
import { searchFetchConfig } from "@/utils/searchFetchConfig";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import MoviePagination from "../MoviePagination";

interface Props {
  query: string;
}

const PeopleGridSearch = ({ query }: Props) => {
  const searchParams = useSearchParams();
  const pageSearchParam = searchParams.get("page");
  const page = parseInt(pageSearchParam || "1");

  const searchConfig = searchFetchConfig(page, query);

  const { data, error, isLoading } = useQuery<MainTitleResponse<People>>({
    queryKey: [RQ_SEARCH_PEOPLE_KEY(query), searchConfig.params],
  });

  if (error)
    throw new Error(`${RQ_SEARCH_PEOPLE_KEY(query)} - ${error.message}`);

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
        {data.results.map((person) => (
          <Card key={person.id} className="flex-row overflow-hidden md:flex">
            <Link href={`/person/${idTitleHyphen(person.id, person.name)}`}>
              <TMDBImages
                type="profile"
                alt={person.name}
                src={person.profile_path}
                className={`w-full md:w-32 md:min-w-36 ${searchMovieCardImage}`}
                sizes={`
                  (max-width: 320px) 285px,
                  (max-width: 639px) 588px,
                  (max-width: 767px) 716px,
                  144px
                `}
              />
            </Link>
            <div className="flex flex-col justify-center gap-4">
              <CardHeader>
                <CardTitle className="m-0">
                  <Link
                    href={`/person/${idTitleHyphen(person.id, person.name)}`}
                  >
                    {person.name}
                  </Link>
                </CardTitle>
                <CardDescription>
                  {person.known_for_department}
                  {person.known_for.length > 0 && (
                    <>
                      &nbsp;&bull;&nbsp;
                      {person.known_for.map((chestie, index) => {
                        if (chestie.title)
                          return (
                            <Link
                              href={`/${chestie.media_type}/${idTitleHyphen(chestie.id, chestie.title)}`}
                            >
                              {chestie.title}{" "}
                              {index < person.known_for.length - 1 && ", "}
                            </Link>
                          );
                      })}
                    </>
                  )}
                </CardDescription>
              </CardHeader>
            </div>
          </Card>
        ))}
      </div>
      <MoviePagination page={page} response={data} />
    </>
  );
};

export default PeopleGridSearch;
