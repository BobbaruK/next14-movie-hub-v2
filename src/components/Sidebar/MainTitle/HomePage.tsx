"use client";

import MyAPIClient from "@/services/myApiClient";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";
import { FaLink } from "react-icons/fa";

interface Props {
  queryKey: string;
  endpoint: string;
}

const HomePage = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<MovieResponse | TVShowResponse>(
    endpoint,
  );
  const { data, error, isLoading } = useQuery<MovieResponse | TVShowResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
    placeholderData: keepPreviousData,
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading home page...</div>;

  return (
    <>
      {data?.homepage && (
        <div className="flex">
          <Link href={data.homepage} target="_blank">
            <FaLink size="2em" />
          </Link>
        </div>
      )}
    </>
  );
};

export default HomePage;
