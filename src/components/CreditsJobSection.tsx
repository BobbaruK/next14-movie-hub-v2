import usePersonTitlesCast from "@/hooks/usePersonTitlesCast";
import { Job } from "@/types/Job";
import { MediaType } from "@/types/MediaType";
import {
  CombinedCreditsMovieCrew,
  CombinedCreditsTVCrew,
} from "@/types/people/CombinedCredits";
import idTitleHyphen from "@/utils/idTitleHyphen";
import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";

interface Props {
  job: Job;
  departmentArr: CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];
  searchParams: {
    credit_media_type: MediaType | null;
  };
}

const CreditsJobSection = ({
  job,
  departmentArr,
  searchParams: { credit_media_type },
}: Props) => {
  const creditsCombined = usePersonTitlesCast(departmentArr);

  const departmentMediaArr = departmentArr.filter(
    (department) => department.media_type === credit_media_type,
  );

  if (departmentMediaArr.length || credit_media_type === null)
    return (
      <div>
        <h2>{job.department}</h2>
        <Card className="peer flex flex-col gap-0 overflow-hidden empty:hidden">
          {creditsCombined
            .sort((a, b) => {
              return b[0][0].year - a[0][0].year;
            })
            .map((groups, index) => {
              return (
                <React.Fragment key={`group-${index}`}>
                  <div>
                    <div className="peer flex flex-col gap-4 px-3 py-4 empty:hidden">
                      {groups.map((groupCredit, ind) => {
                        if (
                          groupCredit[0].media_type === credit_media_type ||
                          credit_media_type === null
                        ) {
                          return (
                            <React.Fragment key={`groupCredit-${ind}`}>
                              <div className="text-center sm:grid sm:grid-cols-person-credit sm:gap-4 sm:text-start">
                                <div className="text-center">
                                  {groupCredit[0].year
                                    ? groupCredit[0].year
                                    : "-"}
                                </div>
                                <div className="hidden sm:block">&bull;</div>
                                <div className="flex flex-col">
                                  <div className="font-bold">
                                    <Link
                                      href={`/${groupCredit[0].media_type}/${idTitleHyphen(
                                        groupCredit[0].id,
                                        "title" in groupCredit[0]
                                          ? groupCredit[0].title
                                          : groupCredit[0].name,
                                      )}`}
                                    >
                                      {"title" in groupCredit[0]
                                        ? groupCredit[0].title
                                        : groupCredit[0].name}
                                    </Link>
                                  </div>
                                  {groupCredit.map((title, index) => {
                                    return (
                                      <div
                                        key={title.id + index}
                                        className="indent-5"
                                      >
                                        {"job" in title && title.job}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        }
                      })}
                    </div>
                    <hr className="peer-empty:hidden" />
                  </div>
                </React.Fragment>
              );
            })}
        </Card>
        <div className="hidden peer-empty:block">No Results</div>
      </div>
    );
};

export default CreditsJobSection;
