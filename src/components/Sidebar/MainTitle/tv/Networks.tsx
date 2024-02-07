"use client";

import CustomAlert from "@/components/CustomAlert";
import TMDBImages from "@/components/TMDBImages";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
}

const Networks = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<TVShowResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Networks"}
        description="Loading... Please be patient"
      />
    );

  return (
    <>
      {data?.type && (
        <div>
          <h3>Networks</h3>
          <ol className="flex flex-col gap-3">
            {data.networks.map((network) => (
              <li key={network.id} className="flex">
                <TMDBImages
                  type="logo"
                  alt={network.name}
                  src={network.logo_path}
                  className="h-16 w-32 object-contain [&>img]:object-contain [&>img]:object-left"
                  sizes="200px"
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};

export default Networks;
