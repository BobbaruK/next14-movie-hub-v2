import CreditsJobSection from "@/components/CreditsJobSection";
import { Job } from "@/types/Job";
import { MediaType } from "@/types/MediaType";
import {
  CombinedCreditsMovieCrew,
  CombinedCreditsTVCrew,
} from "@/types/people/CombinedCredits";

interface Props {
  crewArr: CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];
  jobs: Job[];
  searchParams: {
    credit_media_type: MediaType | null;
  };
}

const Crew = ({
  crewArr,
  jobs,
  searchParams: { credit_media_type },
}: Props) => {
  return (
    <>
      {jobs
        .sort((a, b) => {
          if (a.department < b.department) return -1;
          if (a.department > b.department) return 1;
          return 0;
        })
        .map((job) => {
          const departmentArr = crewArr.filter(
            (department) => department.department === job.department,
          ) as CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];

          if (departmentArr.length)
            return (
              <CreditsJobSection
                key={job.department}
                job={job}
                departmentArr={departmentArr}
                searchParams={{ credit_media_type }}
              />
            );
        })}
    </>
  );
};

export default Crew;
