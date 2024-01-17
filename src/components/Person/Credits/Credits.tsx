"use client";

import MyAPIClient from "@/services/myApiClient";
import { useQuery } from "@tanstack/react-query";
import Acting from "./Acting";
import Crew from "./Crew";

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

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-warning">Loading credits...</div>;

  return (
    <div className="flex flex-col gap-8 py-10">
      <div>
        <h2>Acting</h2>
        <Acting castArr={data?.cast!} />
      </div>
      <Crew crewArr={data?.crew!} />
    </div>
  );
};

export default Credits;
