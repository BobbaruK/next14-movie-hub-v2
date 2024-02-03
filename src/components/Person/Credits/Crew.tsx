import { Card } from "@/components/ui/card";
import usePersonTitlesCrew from "@/hooks/usePersonTitlesCrew";
import useYearsByDepartment from "@/hooks/useYearsByDepartment";
import {
  CombinedCreditsMovieCrew,
  CombinedCreditsTVCrew,
} from "@/types/people/CombinedCredits";
import idTitleHyphen from "@/utils/idTitleHyphen";
import Link from "next/link";

interface Props {
  crewArr: CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];
}

const Crew = ({ crewArr }: Props) => {
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
          <Card className="flex flex-col gap-6 overflow-hidden pt-4">
            {department
              .sort((a, b) => b[0].year - a[0].year)
              .map((yearGroup, ind) => (
                <div key={`yearGroup-${ind}`} className="flex flex-col gap-4 ">
                  {yearGroup.map((crew, indx) => (
                    <div
                      key={crew.id + "" + indx}
                      className="sm:grid sm:grid-cols-person-credit sm:gap-4 px-3 text-center sm:text-start"
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
                  ))}
                  <hr />
                </div>
              ))}
          </Card>
        </div>
      ))}
    </>
  );
};

export default Crew;
