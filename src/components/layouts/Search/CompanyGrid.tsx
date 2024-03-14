"use client";

import CustomAlert from "@/components/CustomAlert";
import { RQ_SEARCH_COMPANY_KEY } from "@/constants";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { SearchCompany } from "@/types/search/companies";
import { searchFetchConfig } from "@/utils/searchFetchConfig";
import { useQuery } from "@tanstack/react-query";
import { notFound, useSearchParams } from "next/navigation";
import MoviePagination from "../MoviePagination";
import TMDBImages from "@/components/TMDBImages";

interface Props {
  query: string;
}

const CompanyGridSearch = ({ query }: Props) => {
  const searchParams = useSearchParams();
  const pageSearchParam = searchParams.get("page");
  const page = parseInt(pageSearchParam || "1");

  const searchConfig = searchFetchConfig(page, query);

  const { data, error, isLoading } = useQuery<MainTitleResponse<SearchCompany>>(
    {
      queryKey: [RQ_SEARCH_COMPANY_KEY(query), searchConfig.params],
    },
  );

  if (error)
    throw new Error(`${RQ_SEARCH_COMPANY_KEY(query)} - ${error.message}`);

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
      <h1 className="flex gap-2">Search companies: &bdquo;{query}&rdquo;</h1>
      <MoviePagination page={page} response={data} />
      <div className="my-4 flex flex-col gap-4 lg:gap-8">
        <ul>
          {data.results.map((keyword) => (
            <li key={keyword.id}>
              {keyword.logo_path ? (
                <TMDBImages
                  type="poster"
                  alt={keyword.name}
                  src={keyword.logo_path}
                  className="h-16 w-32 object-contain [&>img]:object-contain [&>img]:object-left"
                  sizes="200px"
                />
              ) : (
                <>{keyword.name}</>
              )}
              <hr className="my-4" />
            </li>
          ))}
        </ul>
      </div>
      <MoviePagination page={page} response={data} />
    </>
  );
};

export default CompanyGridSearch;
