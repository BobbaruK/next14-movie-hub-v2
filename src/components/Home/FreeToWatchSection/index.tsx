"use client";

import CustomAlert from "@/components/CustomAlert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RQ_TRENDING_ALL_DAY_KEY,
  RQ_TRENDING_ALL_WEEK_KEY,
  homeTrendingTabHeight,
} from "@/constants";
import { RecommendationsResponse } from "@/types/movies/Recommendations";
import { MovieRecommendation } from "@/types/movies/movie/MovieRecommendations";
import { TVShowRecommendation } from "@/types/movies/tv/TVShowRecommendations";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const FreeToWatch = () => {
  const {
    data: trendingDay,
    error: errorTrendingDay,
    isLoading: isLoadingTrendingDay,
  } = useQuery<
    RecommendationsResponse<MovieRecommendation | TVShowRecommendation>
  >({
    queryKey: [RQ_TRENDING_ALL_DAY_KEY],
  });

  const {
    data: trendingWeek,
    error: errorTrendingWeek,
    isLoading: isLoadingTrendingWeek,
  } = useQuery<
    RecommendationsResponse<MovieRecommendation | TVShowRecommendation>
  >({
    queryKey: [RQ_TRENDING_ALL_WEEK_KEY],
  });

  const [showDayTrending, setShowDayTrending] = useState<boolean>(true);
  const [showWeekTrending, setShowWeekTrending] = useState<boolean>(false);

  if (errorTrendingDay)
    throw new Error(`${RQ_TRENDING_ALL_DAY_KEY} - ${errorTrendingDay.message}`);

  if (errorTrendingWeek)
    throw new Error(
      `${RQ_TRENDING_ALL_WEEK_KEY} - ${errorTrendingWeek.message}`,
    );

  if (isLoadingTrendingDay || isLoadingTrendingWeek)
    return (
      <div className="container">
        <CustomAlert
          variant="default"
          title={"Trending tab"}
          description="Loading... Please be patient"
        />
      </div>
    );

  return (
    <div className="container">
      <Tabs defaultValue="movie" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-1 md:gap-8">
          <h2 className="m-0 font-bold">FreeToWatch</h2>
          <TabsList className="h-auto flex-wrap items-start justify-start">
            <TabsTrigger value="movie">Movie</TabsTrigger>
            <TabsTrigger value="tv">TV</TabsTrigger>
          </TabsList>
        </div>
        <div>
          <TabsContent
            value="movie"
            className={`m-0 ${homeTrendingTabHeight}`}
          >
            Movie coming soon...
          </TabsContent>
          <TabsContent value="tv" className={`m-0 ${homeTrendingTabHeight}`}>
            TV coming soon...
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default FreeToWatch;
