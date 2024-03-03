"use client";

import CustomAlert from "@/components/CustomAlert";
import { MainTitleEmblaCarousel } from "@/components/MainTitleEmblaCarousel";
import { RQ_TRENDING_ALL_WEEK_KEY, homeTrendingImageHeight } from "@/constants";
import { RecommendationsResponse } from "@/types/movies/Recommendations";
import { MovieRecommendation } from "@/types/movies/movie/MovieRecommendations";
import { TVShowRecommendation } from "@/types/movies/tv/TVShowRecommendations";
import { useQuery } from "@tanstack/react-query";

const TrendingWeek = () => {
  const { data, error, isLoading } = useQuery<
    RecommendationsResponse<MovieRecommendation | TVShowRecommendation>
  >({
    queryKey: [RQ_TRENDING_ALL_WEEK_KEY],
  });

  if (error) throw new Error(`${RQ_TRENDING_ALL_WEEK_KEY} - ${error.message}`);

  if (isLoading)
    return (
      <div className="container">
        <CustomAlert
          variant="default"
          title={"Trending Week"}
          description="Loading... Please be patient"
        />
      </div>
    );

  return (
    <>
      <MainTitleEmblaCarousel
        typeOptions={{
          type: "movie-recommendation",
          arr: data?.results!,
        }}
        imageDetails={{
          classes: homeTrendingImageHeight,
          sizes: `
						(max-width: 320px) 158px,
						(max-width: 639px) 293px,
						(max-width: 767px) 237px,
						(max-width: 1023px) 241px,
						(max-width: 1279px) 223px,
						141px
					`,
          type: "other",
        }}
        slideSizes="auto-cols-[50%] sm:auto-cols-[33.33%] md:auto-cols-[25%] lg:auto-cols-[20%] xl:auto-cols-[16.66%]"
        carouselOptions={{
          showButtons: true,
        }}
      />
    </>
  );
};

export default TrendingWeek;
