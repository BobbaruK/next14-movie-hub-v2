"use client";

import { RQ_POPULAR_JOBS_ENDPOINT, RQ_POPULAR_JOBS_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Job } from "@/types/Job";
import { useQuery } from "@tanstack/react-query";
import Acting from "./Acting";
import Crew from "./Crew";
import { CombinedCredits } from "@/types/people/CombinedCredits";

interface Props {
  creditsQueryKey: string;
  creditsEndpoint: string;
}

const Credits = ({ creditsEndpoint, creditsQueryKey }: Props) => {
  const apiClient = new MyAPIClient<CombinedCredits>(creditsEndpoint);
  const {
    data: credits,
    error: creditsError,
    isLoading: creditsIsLoading,
  } = useQuery<CombinedCredits>({
    queryKey: [creditsQueryKey],
    queryFn: () => apiClient.getAll(),
  });

  if (creditsError)
    throw new Error(`${creditsQueryKey} - ${creditsError.message}`);

  if (creditsIsLoading)
    return <div className="alert alert-warning">Loading credits...</div>;

  return (
    <div className="flex flex-col gap-8 py-10">
      <div>
        <h2>Acting</h2>
        <Acting castArr={credits?.cast!} />
      </div>
      <Crew crewArr={credits?.crew!} />
    </div>
  );
};

export default Credits;
