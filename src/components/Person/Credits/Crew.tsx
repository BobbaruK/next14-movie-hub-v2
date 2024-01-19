import usePersonTitlesCrew from "@/hooks/usePersonTitlesCrew";
import yearsByDepartment from "@/hooks/yearsByDepartment";
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

  const actualDepartments = yearsByDepartment(departments);

  return (
    <>
      {actualDepartments.map((department, index) => (
        <div key={`department-${index}`}>
          <h2>{department[0][0].department}</h2>
          <div className="flex flex-col gap-6 rounded-md border border-primary pt-4 shadow-md shadow-primary">
            {department.map((yearGroup, ind) => (
              <div key={`yearGroup-${ind}`} className="flex flex-col gap-4 ">
                {yearGroup.map((crew, indx) => (
                  <div
                    key={crew.id + "" + indx}
                    className="grid grid-cols-person-credit gap-4 px-3"
                  >
                    <div className="text-center">
                      {crew.year ? crew.year : "-"}
                    </div>
                    &bull;
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
                <hr className="border-primary" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Crew;
