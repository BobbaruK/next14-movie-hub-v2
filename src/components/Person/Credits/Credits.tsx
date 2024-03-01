"use client";

import CreditsJobSection from "@/components/CreditsJobSection";
import CustomAlert from "@/components/CustomAlert";
import { RQ_POPULAR_JOBS_KEY } from "@/constants";
import { Job } from "@/types/Job";
import { MediaType } from "@/types/MediaType";
import {
  CombinedCredits,
  CombinedCreditsMovieCrew,
  CombinedCreditsTVCrew,
} from "@/types/people/CombinedCredits";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
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
      <div className={`flex items-center justify-between gap-8`}>
        <h2 className="m-0">Credits</h2>
        <FilteringCredits />
      </div>
      <CreditsJobSection
        departmentArr={credits?.cast!}
        searchParams={{
          credit_media_type: creditMediaType,
        }}
      />
      {jobs
        ?.sort((a, b) => {
          if (a.department < b.department) return -1;
          if (a.department > b.department) return 1;
          return 0;
        })
        .map((job) => {
          const departmentArr = credits?.crew.filter(
            (department) => department.department === job.department,
          ) as CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];

          if (departmentArr.length) {
            return (
              <CreditsJobSection
                key={job.department}
                job={job}
                departmentArr={departmentArr}
                searchParams={{
                  credit_media_type: creditMediaType,
                }}
              />
            );
          }
        })}
    </div>
  );
};

export default Credits;
