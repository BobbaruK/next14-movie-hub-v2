import groupBy from "@/utils/groupBy";
import idTitleHyphen from "@/utils/idTitleHyphen";
import ReleaseDateUI from "@/utils/releaseDateUI";
import Link from "next/link";
import React from "react";

interface Props {
  crewArr: CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];
}

const Crew = ({ crewArr }: Props) => {
  // add year member to crewArr items
  for (let i = 0; i < crewArr.length; i++) {
    const data = crewArr[i];
    crewArr[i].year = ReleaseDateUI(
      "title" in data ? data.release_date : data.first_air_date,
    ).year!;
  }

  const crewSortDep = groupBy<CombinedCreditsMovieCrew | CombinedCreditsTVCrew>(
    crewArr,
    (crew) => {
      return crew.department;
    },
  );

  const crewSortDepArr = Object.values(crewSortDep);

  return (
    <>
      {crewSortDepArr
        .sort((a, b) => {
          if (a[0].department < b[0].department) {
            return -1;
          }
          if (a[0].department > b[0].department) {
            return 1;
          }
          return 0;
        })
        .map((groups, index) => (
          <div key={`groups-${index}`}>
            <h2>{groups[0].department}</h2>
            <div className="flex flex-col gap-6 rounded-md border border-primary pt-4 shadow-md shadow-primary">
              {groups
                .sort((a, b) => {
                  return b.year - a.year;
                })
                .map((group, ind) => (
                  <React.Fragment key={`group-${ind}`}>
                    <div className="grid grid-cols-person-credit gap-4">
                      <div className="text-center">{group.year ? group.year : "-"}</div>
                      &bull;
                      <div className="flex flex-col">
                        <div className="font-bold">
                          <Link
                            href={`/${group.media_type}/${idTitleHyphen(
                              group.id,
                              "title" in group ? group.title : group.name,
                            )}`}
                          >
                            {"title" in group ? group.title : group.name}
                          </Link>
                        </div>
                        <div className="indent-5">...{group.job}</div>
                      </div>
                    </div>
                    <hr className="border-primary" />
                  </React.Fragment>
                ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default Crew;
