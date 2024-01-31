"use client";

import MyAPIClient from "@/services/myApiClient";
import { RecommendationsResponse } from "@/types/movies/Recommendations";
import { MovieRecommendation } from "@/types/movies/movie/MovieRecommendations";
import { TVShowRecommendation } from "@/types/movies/tv/TVShowRecommendations";
import { useQuery } from "@tanstack/react-query";
import { MainTitleEmblaCarousel } from "../MainTitleEmblaCarousel";
import CustomAlert from "../CustomAlert";
import { recommendationImageHeight } from "@/constants";

interface Props {
  queryKey: string;
  endpoint: string;
}

const MainTitleRecommendations = ({ queryKey, endpoint }: Props) => {
  const apiClient = new MyAPIClient<
    RecommendationsResponse<MovieRecommendation | TVShowRecommendation>
  >(endpoint);
  const { data, error, isLoading } = useQuery<
    RecommendationsResponse<MovieRecommendation | TVShowRecommendation>
  >({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <>
        <CustomAlert
          variant="default"
          title={"Movie recommendations"}
          description="Loading... Please be patient"
        />
      </>
    );

  const recommended = [...(data?.results || [])];

  return (
    <>
      {recommended.length > 0 && (
        <div>
          <h2>Recommendations</h2>
          <MainTitleEmblaCarousel
            typeOptions={{ type: "movie-recommendation", arr: recommended }}
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
      )}
    </>
  );
};

export default MainTitleRecommendations;
