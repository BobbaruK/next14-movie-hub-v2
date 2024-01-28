"use client";

import MyAPIClient from "@/services/myApiClient";
import { RecommendationsResponse } from "@/types/movies/Recommendations";
import { MovieRecommendation } from "@/types/movies/movie/MovieRecommendations";
import { TVShowRecommendation } from "@/types/movies/tv/TVShowRecommendations";
import { useQuery } from "@tanstack/react-query";
import { MainTitleEmblaCarousel } from "../MainTitleEmblaCarousel";

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
      <div className="alert alert-warning">
        Loading movie recommendations...
      </div>
    );

  const recommended = [...(data?.results || [])];

  return (
    <>
      {recommended.length > 0 && (
        <div>
          <h2>Recommendations</h2>
          <MainTitleEmblaCarousel
            typeOptions={{ type: "movie-recommendation", arr: recommended }}
          />
        </div>
      )}
    </>
  );
};

export default MainTitleRecommendations;
