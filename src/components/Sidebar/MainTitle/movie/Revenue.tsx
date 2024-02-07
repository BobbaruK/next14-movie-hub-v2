"use client";

import CustomAlert from "@/components/CustomAlert";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
}

const Revenue = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<MovieResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Revenue"}
        description="Loading... Please be patient"
      />
    );

  return (
    <>
      <div>
        <h3>Revenue</h3>
        <p>
          {data?.revenue !== 0 ? `$${data?.revenue.toLocaleString()}` : "-"}
        </p>
      </div>
    </>
  );
};

export default Revenue;
