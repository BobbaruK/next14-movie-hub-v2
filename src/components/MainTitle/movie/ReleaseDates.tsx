"use client";

import ReleaseDateCard from "@/components/Cards/ReleaseDate";
import CustomAlert from "@/components/CustomAlert";
import { ReleaseDatesResponse } from "@/types/movies/movie/ReleaseDates";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
}

const ReleaseDates = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<ReleaseDatesResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Release dates"}
        description="Loading... Please be patient"
      />
    );

  if (data?.results.length === 0)
    return (
      <CustomAlert
        variant="destructive"
        title={"Error"}
        description="No results"
      />
    );

  return (
    <div className="flex flex-col gap-8">
      {data?.results
        .sort((a, b) => {
          if (a.iso_3166_1 < b.iso_3166_1) {
            return -1;
          }
          if (a.iso_3166_1 > b.iso_3166_1) {
            return 1;
          }
          return 0;
        })
        .map((date) => (
          <ReleaseDateCard releaseDate={date} key={date.iso_3166_1} />
        ))}
    </div>
  );
};

export default ReleaseDates;
