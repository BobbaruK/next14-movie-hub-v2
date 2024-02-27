import { Card } from "@/components/ui/card";
import usePersonTitlesCrew from "@/hooks/usePersonTitlesCrew";
import useYearsByDepartment from "@/hooks/useYearsByDepartment";
import { MediaType } from "@/types/MediaType";
import {
  CombinedCreditsMovieCrew,
  CombinedCreditsTVCrew,
} from "@/types/people/CombinedCredits";
import idTitleHyphen from "@/utils/idTitleHyphen";
import Link from "next/link";
import React from "react";

interface Props {
  crewArr: CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];
  searchParams: {
    credit_media_type: MediaType | null;
  };
}

const Crew = ({ crewArr, searchParams: { credit_media_type } }: Props) => {
  const departments = usePersonTitlesCrew(crewArr);
  departments.sort((a, b) => {
    if (a[0].department < b[0].department) return -1;
    if (a[0].department > b[0].department) return 1;
    return 0;
  });

  const actualDepartments = useYearsByDepartment(departments);

  return (
    <>
      {actualDepartments.map((department, index) => (
        <div key={`department-${index}`}>
          <h2>{department[0][0].department}</h2>
          <Card className="peer flex flex-col gap-6 overflow-hidden pt-4 empty:hidden">
            {department
              .sort((a, b) => b[0].year - a[0].year)
              .map((yearGroup, ind) => {
                if (
                  yearGroup[0].media_type === credit_media_type ||
                  credit_media_type === null
                )
                  return (
                    <React.Fragment key={`yearGroup-${ind}`}>
                      <div className="flex flex-col gap-4 empty:hidden">
                        {yearGroup.map((crew, indx) => {
                          return (
                            <div
                              key={crew.id + "" + indx}
                              className="peer px-3 text-center empty:hidden sm:grid sm:grid-cols-person-credit sm:gap-4 sm:text-start"
                            >
                              <div className="text-center">
                                {crew.year ? crew.year : "-"}
                              </div>
                              <div className="hidden sm:block">&bull;</div>
                              <div className="flex flex-col">
                                <div className="font-bold">
                                  <Link
                                    href={`/${crew.media_type}/${idTitleHyphen(
                                      crew.id,
                                      "title" in crew ? crew.title : crew.name,
                                    )}`}
                                  >
                                    {"title" in crew ? crew.title : crew.name}
                                  </Link>
                                </div>
                                <div className="indent-5">...{crew.job}</div>
                              </div>
                            </div>
                          );
                        })}
                        <hr className="peer-empty:hidden" />
                      </div>
                    </React.Fragment>
                  );
              })}
          </Card>
          <div className="hidden peer-empty:block">No Results</div>
        </div>
      ))}
    </>
  );
};

export default Crew;
