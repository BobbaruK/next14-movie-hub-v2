"use client";

import CustomAlert from "@/components/CustomAlert";
import { RQ_POPULAR_JOBS_KEY } from "@/constants";
import { Job } from "@/types/Job";
import { MediaType } from "@/types/MediaType";
import { CombinedCredits } from "@/types/people/CombinedCredits";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Acting from "./Acting";
import Crew from "./Crew";
import FilteringCredits from "./Filtering";

interface Props {
  queryKey: string;
}

const Credits = ({ queryKey }: Props) => {
  const searchParams = useSearchParams();

  const creditMediaType = searchParams.get(
    "credit_media_type",
  ) as MediaType | null;

  const {
    data: credits,
    error: creditsError,
    isLoading: creditsIsLoading,
  } = useQuery<CombinedCredits>({
    queryKey: [queryKey],
  });

  const {
    data: jobs,
    error: jobsError,
    isLoading: jobsIsLoading,
  } = useQuery<Job[]>({
    queryKey: [RQ_POPULAR_JOBS_KEY],
  });

  if (creditsError) throw new Error(`${queryKey} - ${creditsError.message}`);
  if (jobsError) throw new Error(`${queryKey} - ${jobsError.message}`);

  if (creditsIsLoading || jobsIsLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Credits"}
        description="Loading... Please be patient"
      />
    );

  return (
    <div className="flex flex-col gap-8 py-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-8">
          <h2 className="m-0">Acting</h2>
          <div className="flex items-center justify-center gap-4">
            <FilteringCredits />
          </div>
        </div>
        {/* TODO: filtering acting/crew */}
        <Acting
          castArr={credits?.cast!}
          searchParams={{
            credit_media_type: creditMediaType,
          }}
        />
      </div>
      <Crew
        crewArr={credits?.crew!}
        jobs={jobs!}
        searchParams={{
          credit_media_type: creditMediaType,
        }}
      />
    </div>
  );
};

export default Credits;
