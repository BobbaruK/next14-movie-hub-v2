import {
  CombinedCreditsMovieCrew,
  CombinedCreditsTVCrew,
} from "@/types/people/CombinedCredits";
import groupBy from "@/utils/groupBy";

const yearsByDepartment = (
  departments: (CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[])[],
) => {
  const output = [];

  for (let i = 0; i < departments.length; i++) {
    const groupByYear = groupBy<
      CombinedCreditsMovieCrew | CombinedCreditsTVCrew
    >(departments[i], (crew) => {
      return crew.year;
    });

    const groupByYearArray = Object.values(groupByYear);

    let undefinedYearIndexes: number[] = [];

    const undefinedYear = groupByYearArray.filter((groups, index) => {
      if (groups[0].year === undefined) undefinedYearIndexes.push(index);
      return groups[0].year === undefined;
    });

    undefinedYearIndexes.forEach((ind) => {
      groupByYearArray.splice(ind, 1);
    });

    if (undefinedYear[0]) groupByYearArray.unshift(undefinedYear[0]);

    output.push(groupByYearArray);
  }

  return output;
};

export default yearsByDepartment;
