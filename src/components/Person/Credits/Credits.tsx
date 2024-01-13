"use client";

import usePersonTitlesCast from "@/hooks/usePersonTitlesCast";
import MyAPIClient from "@/services/myApiClient";
import { useQuery } from "@tanstack/react-query";
import Acting from "./Acting";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Credits = ({ endpoint, queryKey }: Props) => {
  const apiClient = new MyAPIClient<CombinedCredits>(endpoint);
  const { data, error, isLoading } = useQuery<CombinedCredits>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  const moviesCast = data?.cast.filter(
    (cast) => cast.media_type === "movie",
  ) as CombinedCreditsMovieCast[];

  const tvsCast = data?.cast.filter(
    (cast) => cast.media_type === "tv",
  ) as CombinedCreditsTVCast[];

  const creditsCombined = usePersonTitlesCast(moviesCast, tvsCast);

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading credits...</div>;

  return (
    <div className="flex flex-col gap-8 py-10">
      <div>
        <h2>Acting</h2>
        <Acting castArr={creditsCombined} />
      </div>
    </div>
  );
};

export default Credits;
