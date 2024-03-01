import {
  CombinedCreditsMovieCast,
  CombinedCreditsMovieCrew,
  CombinedCreditsTVCast,
  CombinedCreditsTVCrew,
} from "@/types/people/CombinedCredits";
import groupBy from "@/utils/groupBy";
import ReleaseDateUI from "@/utils/releaseDateUI";

// TODO: sort by year first and afterwards sort by name... eventually just the tv shows?

const usePersonCredits = (
  creditsArr:
    | CombinedCreditsMovieCast[]
    | CombinedCreditsTVCast[]
    | CombinedCreditsMovieCrew[]
    | CombinedCreditsTVCrew[],
) => {
  const creditsArrWithYear = [...creditsArr] as
    | CombinedCreditsMovieCast[]
    | CombinedCreditsTVCast[]
    | CombinedCreditsMovieCrew[]
    | CombinedCreditsTVCrew[];

  for (let i = 0; i < creditsArrWithYear.length; i++) {
    const t = creditsArrWithYear[i];
    t.year = ReleaseDateUI(
      "title" in t ? t.release_date : t.first_air_date,
    ).year!;
  }

  const groupByYear = groupBy<
    | CombinedCreditsMovieCast
    | CombinedCreditsTVCast
    | CombinedCreditsMovieCrew
    | CombinedCreditsTVCrew
  >(creditsArrWithYear, (cast) => {
    return cast.year;
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

  return groupByYearArray;
};

export default usePersonCredits;
