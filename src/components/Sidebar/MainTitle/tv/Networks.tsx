"use client";

import TMDBImages from "@/components/TMDBImages";
import MyAPIClient from "@/services/myApiClient";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Networks = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<TVShowResponse>(endpoint);
  const { data, error, isLoading } = useQuery<TVShowResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-warning">Loading networks...</div>;

  return (
    <>
      {data?.type && (
        <div>
          <h3>Networks</h3>
          <ol className="flex flex-col gap-3">
            {data.networks.map((network) => (
              <li key={network.id} className="flex">
                <TMDBImages
                  type={{ type: "logo", size: "w92" }}
                  alt={network.name}
                  src={network.logo_path}
                  className="w-32 h-16 object-contain [&>img]:object-contain [&>img]:object-left"
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
