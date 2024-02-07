"use client";

import { CombinedCredits } from "@/types/people/CombinedCredits";
import { useQuery } from "@tanstack/react-query";
import Acting from "./Acting";
import Crew from "./Crew";
import CustomAlert from "@/components/CustomAlert";

interface Props {
  queryKey: string;
}

const Credits = ({ queryKey }: Props) => {
  const {
    data: credits,
    error: creditsError,
    isLoading: creditsIsLoading,
  } = useQuery<CombinedCredits>({
    queryKey: [queryKey],
  });

  if (creditsError) throw new Error(`${queryKey} - ${creditsError.message}`);

  if (creditsIsLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Credits"}
        description="Loading... Please be patient"
      />
    );

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
