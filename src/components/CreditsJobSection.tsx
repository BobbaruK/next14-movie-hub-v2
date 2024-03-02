import usePersonCredits from "@/hooks/usePersonCredits";
import { Department, Job } from "@/types/Job";
import { MediaType } from "@/types/MediaType";
import {
  CombinedCreditsMovieCast,
  CombinedCreditsMovieCrew,
  CombinedCreditsTVCast,
  CombinedCreditsTVCrew,
} from "@/types/people/CombinedCredits";
import idTitleHyphen from "@/utils/idTitleHyphen";
import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";

// TODO: handle multiple credits
/**
 * Not happy with multiple credits:
 *
 * http://localhost:3000/person/52139-seth-macfarlane
 *
 * search for Cosmos... al credits should be under
 * the same entry "Cosmos"
 */

interface Props {
  departmentArr:
    | CombinedCreditsMovieCrew[]
    | CombinedCreditsTVCrew[]
    | CombinedCreditsMovieCast[]
    | CombinedCreditsTVCast[];
  searchParams: {
    credit_media_type: MediaType | null;
    credit_department: Department | null;
  };
  job?: Job;
}

const CreditsJobSection = ({
  departmentArr,
  searchParams: { credit_media_type, credit_department },
  job,
}: Props) => {
  const creditsCombined = usePersonCredits(departmentArr);

  const departmentMediaArr = departmentArr.filter(
    (department) => department.media_type === credit_media_type,
  );

  if (
    credit_department !== null &&
    job?.department !== credit_department &&
    credit_department !== "Actors"
  )
    return;

  if (
    departmentMediaArr.length ||
    credit_media_type === null ||
    credit_department === "Actors"
  )
    return (
      <div>
        <div className={`mb-4 flex items-center justify-between gap-8`}>
          <h3 className="m-0">{job?.department || "Acting"}</h3>
        </div>
        <Card className="flex flex-col gap-0 overflow-hidden">
          {creditsCombined
            .sort((a, b) => {
              return b[0].year - a[0].year;
            })
            .map((groups, index) => {
              return (
                <React.Fragment key={`group-${index}`}>
                  <div>
                    <div className="peer flex flex-col gap-4 px-3 py-4 empty:hidden">
                      {groups.map((groupCredit, ind) => {
                        if (
                          groupCredit.media_type === credit_media_type ||
                          credit_media_type === null
                        ) {
                          return (
                            <React.Fragment key={`groupCredit-${ind}`}>
                              <div className="text-center sm:grid sm:grid-cols-person-credit sm:gap-4 sm:text-start">
                                <div className="text-center">
                                  {groupCredit.year ? groupCredit.year : "-"}
                                </div>
                                <div className="hidden sm:block">&bull;</div>
                                <div className="flex flex-col">
                                  <div className="font-bold">
                                    <Link
                                      href={`/${groupCredit.media_type}/${idTitleHyphen(
                                        groupCredit.id,
                                        "title" in groupCredit
                                          ? groupCredit.title
                                          : groupCredit.name,
                                      )}`}
                                    >
                                      {"title" in groupCredit
                                        ? groupCredit.title
                                        : groupCredit.name}
                                    </Link>
                                  </div>
                                  <div
                                    key={groupCredit.id + index}
                                    className="indent-5"
                                  >
                                    {groupCredit.media_type === "tv" &&
                                      `(${
                                        !("title" in groupCredit) &&
                                        groupCredit.episode_count
                                      } episode${
                                        !("title" in groupCredit) &&
                                        (groupCredit.episode_count > 1
                                          ? "s"
                                          : "")
                                      }) `}

                                    {"character" in groupCredit &&
                                      groupCredit.character &&
                                      "as " + groupCredit.character}

                                    {"job" in groupCredit && groupCredit.job}
                                  </div>
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
      </div>
    );
};

export default CreditsJobSection;
