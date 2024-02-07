"use client";

import CustomAlert from "@/components/CustomAlert";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
}

const Budget = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<MovieResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Budget"}
        description="Loading... Please be patient"
      />
    );

  return (
    <>
      <div>
        <h3>Budget</h3>
        <p>{data?.budget !== 0 ? `$${data?.budget.toLocaleString()}` : "-"}</p>
      </div>
    </>
  );
};

export default Budget;
