import groupBy from "@/utils/groupBy";
import ReleaseDateUI from "@/utils/releaseDateUI";

const usePersonTitlesCrew = (
  castArr: CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[],
) => {
  const crewSortDep = groupBy<CombinedCreditsMovieCrew | CombinedCreditsTVCrew>(
    castArr,
    (crew) => {
      return crew.department;
    },
  );

  const crewSortDepArr = Object.values(crewSortDep);

  for (let i = 0; i < crewSortDepArr.length; i++) {
    for (let j = 0; j < crewSortDepArr[i].length; j++) {
      const t = crewSortDepArr[i][j];
      crewSortDepArr[i][j].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }
  }

  console.log(crewSortDep);

  for (let i = 0; i < crewSortDepArr.length; i++) {
    const group = crewSortDepArr[i];

    const groupSortYear = groupBy<
      CombinedCreditsMovieCrew | CombinedCreditsTVCrew
    >(group, (e) => {
      return e.year;
    });

    const groupSortYearArr = Object.values(groupSortYear);
    console.log(groupSortYear);

    for (let j = 0; j < groupSortYearArr.length; j++) {
      // crewSortDepArr[i].push(groupSortYearArr[j]);
    }
  }

  // const groupByYear = groupBy<CombinedCreditsMovieCrew | CombinedCreditsTVCrew>(
  //   crewSortDepArr,
  //   (cast) => {
  //     return cast.year;
  //   },
  // );

  // const groupByYearArray = Object.values(groupByYear);

  // let undefinedYearIndexes: number[] = [];

  // const undefinedYear = groupByYearArray.filter((groups, index) => {
  //   if (groups[0][0].year === undefined) undefinedYearIndexes.push(index);
  //   return groups[0][0].year === undefined;
  // });

  // undefinedYearIndexes.forEach((ind) => {
  //   groupByYearArray.splice(ind, 1);
  // });

  // if (undefinedYear[0]) groupByYearArray.unshift(undefinedYear[0]);

  // console.log(groupByYear);

  // return groupByYearArray;

  return crewSortDepArr;
};

export default usePersonTitlesCrew;
