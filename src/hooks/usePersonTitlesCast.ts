import groupBy from "@/utils/groupBy";
import ReleaseDateUI from "@/utils/releaseDateUI";

const usePersonTitlesCast = (
  castArr: CombinedCreditsMovieCast[] | CombinedCreditsTVCast[],
) => {
  const moviesCast = castArr.filter(
    (cast) => cast.media_type === "movie",
  ) as CombinedCreditsMovieCast[];

  const tvsCast = castArr.filter(
    (cast) => cast.media_type === "tv",
  ) as CombinedCreditsTVCast[];

  const moviesCastSortTitle = groupBy<CombinedCreditsMovieCast>(
    moviesCast,
    (cast) => {
      return cast.title;
    },
  );

  const moviesCastSortTitleArr = Object.values(moviesCastSortTitle);

  const tvCastSortTitle = groupBy<CombinedCreditsTVCast>(tvsCast, (cast) => {
    return cast.name;
  });

  const tvCastSortTitleArr = Object.values(tvCastSortTitle);

  const castCreditsArray = [...moviesCastSortTitleArr, ...tvCastSortTitleArr];

  for (let i = 0; i < castCreditsArray.length; i++) {
    for (let j = 0; j < castCreditsArray[i].length; j++) {
      const t = castCreditsArray[i][j];
      castCreditsArray[i][j].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }
  }

  const groupByYear = groupBy<
    CombinedCreditsMovieCast[] | CombinedCreditsTVCast[]
  >(castCreditsArray, (cast) => {
    return cast[0].year;
  });

  const groupByYearArray = Object.values(groupByYear);

  let undefinedYearIndexes: number[] = [];

  const undefinedYear = groupByYearArray.filter((groups, index) => {
    if (groups[0][0].year === undefined) undefinedYearIndexes.push(index);
    return groups[0][0].year === undefined;
  });

  undefinedYearIndexes.forEach((ind) => {
    groupByYearArray.splice(ind, 1);
  });

  if (undefinedYear[0]) groupByYearArray.unshift(undefinedYear[0]);

  return groupByYearArray;
};

export default usePersonTitlesCast;
