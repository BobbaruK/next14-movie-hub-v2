import ReleaseDateUI from "@/utils/releaseDateUI";

const usePersonTitlesCast = (
  moviesCast: CombinedCreditsMovieCast[],
  tvsCast: CombinedCreditsTVCast[],
) => {
  const movies = moviesCast.reduce(
    (group: { [key: string]: CombinedCreditsMovieCast[] }, item) => {
      if (!group[item.title]) {
        group[item.title] = [];
      }
      group[item.title].push(item);
      return group;
    },
    {},
  );

  const moviesArray = Object.values(movies);

  const tvs = tvsCast.reduce(
    (group: { [key: string]: CombinedCreditsTVCast[] }, item) => {
      if (!group[item.name]) {
        group[item.name] = [];
      }
      group[item.name].push(item);
      return group;
    },
    {},
  );

  const tvsArray = Object.values(tvs);

  const castCreditsArray = [...moviesArray, ...tvsArray];

  for (let i = 0; i < castCreditsArray.length; i++) {
    for (let j = 0; j < castCreditsArray[i].length; j++) {
      const t = castCreditsArray[i][j];
      castCreditsArray[i][j].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }
  }

  const groupByYear = castCreditsArray.reduce(
    (
      group: {
        [key: string]: (CombinedCreditsMovieCast[] | CombinedCreditsTVCast[])[];
      },
      item,
    ) => {
      // console.log(group);
      if (!group[item[0].year]) {
        group[item[0].year] = [];
      }

      group[item[0].year].push(item);

      return group;
    },
    {},
  );

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
