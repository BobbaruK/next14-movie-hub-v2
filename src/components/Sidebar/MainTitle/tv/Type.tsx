"use client";

import CustomAlert from "@/components/CustomAlert";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
}

const Type = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<TVShowResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Type"}
        description="Loading... Please be patient"
      />
    );

  return (
    <>
      {data?.type && (
        <div>
          <h3>Type</h3>
          <p>{data?.type}</p>
        </div>
      )}
    </>
  );
};

export default Type;
