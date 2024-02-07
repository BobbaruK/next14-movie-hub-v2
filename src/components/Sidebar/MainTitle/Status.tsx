"use client";

import CustomAlert from "@/components/CustomAlert";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
}

const Status = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<MovieResponse | TVShowResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Status"}
        description="Loading... Please be patient"
      />
    );

  return (
    <>
      {data?.status && (
        <div>
          <h3>Status</h3>
          <p>{data?.status}</p>
        </div>
      )}
    </>
  );
};

export default Status;
