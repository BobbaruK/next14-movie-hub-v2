import LatestTrailersSection from "@/components/Home/LatestTrailersSection";
import TrendingSection from "@/components/Home/TrendingSection";
import {
  RQ_TRENDING_ALL_DAY_ENDPOINT,
  RQ_TRENDING_ALL_DAY_KEY,
  RQ_TRENDING_ALL_WEEK_ENDPOINT,
  RQ_TRENDING_ALL_WEEK_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { RecommendationsResponse } from "@/types/movies/Recommendations";
import { MovieRecommendation } from "@/types/movies/movie/MovieRecommendations";
import { TVShowRecommendation } from "@/types/movies/tv/TVShowRecommendations";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

  // Tranding Day prefetch
  const apiClientTrendingDay = new MyAPIClient<
    RecommendationsResponse<MovieRecommendation | TVShowRecommendation>
  >(RQ_TRENDING_ALL_DAY_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_TRENDING_ALL_DAY_KEY],
    queryFn: () => apiClientTrendingDay.getAll(),
  });

  // Tranding Week prefetch
  const apiClientTrendingWeek = new MyAPIClient<
    RecommendationsResponse<MovieRecommendation | TVShowRecommendation>
  >(RQ_TRENDING_ALL_WEEK_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_TRENDING_ALL_WEEK_KEY],
    queryFn: () => apiClientTrendingWeek.getAll(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TrendingSection />
        <LatestTrailersSection />
      </HydrationBoundary>
    </>
  );
}
