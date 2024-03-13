"use client";

import CustomAlert from "@/components/CustomAlert";
import { RQ_SEARCH_MOVIE_KEY } from "@/constants";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { SearchMovieResponse } from "@/types/search/movies";
import { useQuery } from "@tanstack/react-query";
import MoviePagination from "../MoviePagination";
import { useSearchParams } from "next/navigation";

interface Props {
  query: string;
}

const MovieGridSearch = ({ query }: Props) => {
  const searchParams = useSearchParams();
  const pageSearchParam = searchParams.get("page");
  const page = parseInt(pageSearchParam || "1");

  const { data, error, isLoading } = useQuery<
    MainTitleResponse<SearchMovieResponse>
  >({
    queryKey: [RQ_SEARCH_MOVIE_KEY(query)],
  });

  // console.log(data);

  if (!query)
    return (
      <CustomAlert
        variant={"destructive"}
        title={"Error"}
        description="No query passed to search"
      />
    );

  return (
    <div>
      {/* {page} */}
      <MoviePagination page={page} response={data!} />
      Movies and TV Shows: <b>{query}</b>
    </div>
  );
};

export default MovieGridSearch;
