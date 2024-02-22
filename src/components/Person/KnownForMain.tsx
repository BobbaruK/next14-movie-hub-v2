"use client";

import { CombinedCredits } from "@/types/people/CombinedCredits";
import { useQuery } from "@tanstack/react-query";
import CustomAlert from "../CustomAlert";
import { recommendationImageHeight } from "@/constants";
import { MainTitleEmblaCarousel } from "../MainTitleEmblaCarousel";

interface Props {
  queryKey: string;
}

const KnownForMain = ({ queryKey }: Props) => {
  const {
    data: credits,
    error: creditsError,
    isLoading: creditsIsLoading,
  } = useQuery<CombinedCredits>({
    queryKey: [queryKey],
  });

  if (creditsError) throw new Error(`${queryKey} - ${creditsError.message}`);

  if (creditsIsLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Credits"}
        description="Loading... Please be patient"
      />
    );

  const knownForMovies = credits?.cast;
  knownForMovies?.sort((a, b) => {
    if (a.vote_average > b.vote_average) return -1;
    if (a.vote_average < b.vote_average) return 1;
    return 0;
  });

  if (knownForMovies) knownForMovies.length = 10;

  return (
    <div className="pt-10">
      <h2>Known For</h2>
      <MainTitleEmblaCarousel
        typeOptions={{ type: "known-for", arr: knownForMovies! }}
        slideSizes="auto-cols-[50%] grid-flow-col sm:auto-cols-[33.33333333333333%] md:auto-cols-[25%]  xl:auto-cols-[14.28571428571429%]"
        imageDetails={{
          classes: recommendationImageHeight,
          sizes: `
                (max-width: 320px) 158px,
                (max-width: 639px) 293px,
                (max-width: 767px) 237px,
                (max-width: 1023px) 241px,
                (max-width: 1279px) 223px,
                141px
              `,
          type: "other", // doesn't matter, it is being handled inside this component
        }}
      />
    </div>
  );
};

export default KnownForMain;
