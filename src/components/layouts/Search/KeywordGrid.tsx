"use client";

import CustomAlert from "@/components/CustomAlert";
import { RQ_SEARCH_KEYWORD_KEY } from "@/constants";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { SearchKeyword } from "@/types/search/keywords";
import { searchFetchConfig } from "@/utils/searchFetchConfig";
import { useQuery } from "@tanstack/react-query";
import { notFound, useSearchParams } from "next/navigation";
import MoviePagination from "../MoviePagination";
import { Badge } from "@/components/ui/badge";

interface Props {
  query: string;
}

const KeywordGridSearch = ({ query }: Props) => {
  const searchParams = useSearchParams();
  const pageSearchParam = searchParams.get("page");
  const page = parseInt(pageSearchParam || "1");

  const searchConfig = searchFetchConfig(page, query);

  const { data, error, isLoading } = useQuery<MainTitleResponse<SearchKeyword>>(
    {
      queryKey: [RQ_SEARCH_KEYWORD_KEY(query), searchConfig.params],
    },
  );

  if (error)
    throw new Error(`${RQ_SEARCH_KEYWORD_KEY(query)} - ${error.message}`);

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
      <h1 className="flex gap-2">Search keywords: &bdquo;{query}&rdquo;</h1>
      <div className="my-4 flex flex-col gap-4 lg:gap-8">
        <ul>
          {data.results.map((keyword) => (
            <li key={keyword.id}>{keyword.name}</li>
          ))}
        </ul>
      </div>
      <MoviePagination page={page} response={data} />
    </>
  );
};

export default KeywordGridSearch;
